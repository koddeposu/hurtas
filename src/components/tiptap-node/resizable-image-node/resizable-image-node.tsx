"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { NodeSelection } from "@tiptap/pm/state";

export function ResizableImageNodeView({
  node,
  updateAttributes,
  selected,
  editor,
  getPos,
}: NodeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [initialWidth, setInitialWidth] = useState(0);
  const [initialX, setInitialX] = useState(0);
  const [resizeDirection, setResizeDirection] = useState<"left" | "right" | null>(null);

  const { src, alt, title, width, align = "center" } = node.attrs;

  // Select this node on click
  const handleImageClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!editor || typeof getPos !== "function") return;

      const pos = getPos();
      if (typeof pos !== "number") return;

      // Create a NodeSelection for this image
      const tr = editor.state.tr;
      const selection = NodeSelection.create(editor.state.doc, pos);
      tr.setSelection(selection);
      editor.view.dispatch(tr);
      editor.view.focus();
    },
    [editor, getPos]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, direction: "left" | "right") => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      setResizeDirection(direction);
      setInitialX(e.clientX);

      // Get current width
      const currentWidth = imgRef.current?.offsetWidth || 0;
      setInitialWidth(currentWidth);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !resizeDirection) return;

      const delta = e.clientX - initialX;
      let newWidth: number;

      if (resizeDirection === "right") {
        newWidth = initialWidth + delta;
      } else {
        newWidth = initialWidth - delta;
      }

      // Minimum width
      newWidth = Math.max(100, newWidth);

      // Maximum width (container width)
      const containerWidth = containerRef.current?.parentElement?.offsetWidth || 800;
      newWidth = Math.min(containerWidth, newWidth);

      updateAttributes({ width: Math.round(newWidth) });
    },
    [isResizing, resizeDirection, initialX, initialWidth, updateAttributes]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    setResizeDirection(null);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const alignmentStyle: React.CSSProperties = {
    marginLeft: align === "right" ? "auto" : align === "center" ? "auto" : "0",
    marginRight: align === "left" ? "auto" : align === "center" ? "auto" : "0",
  };

  return (
    <NodeViewWrapper
      ref={containerRef}
      className="resizable-image-wrapper"
      data-align={align}
      style={{
        display: "block",
        position: "relative",
        width: width ? `${width}px` : "auto",
        maxWidth: "100%",
        margin: "1.5rem 0",
        ...alignmentStyle,
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt || ""}
        title={title || ""}
        draggable={false}
        onClick={handleImageClick}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          borderRadius: "0.5rem",
          cursor: "pointer",
          outline: selected ? "2px solid var(--tt-brand-color-500, #49202d)" : "2px solid transparent",
          transition: "outline-color 0.15s ease",
        }}
      />

      {/* Resize handles - only show when selected */}
      {selected && (
        <>
          {/* Left handle */}
          <div
            className="resize-handle resize-handle-left"
            onMouseDown={(e) => handleMouseDown(e, "left")}
            style={{
              position: "absolute",
              left: "-6px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "12px",
              height: "40px",
              backgroundColor: "var(--tt-brand-color-500, #49202d)",
              borderRadius: "4px",
              cursor: "ew-resize",
              opacity: 0.9,
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          />
          {/* Right handle */}
          <div
            className="resize-handle resize-handle-right"
            onMouseDown={(e) => handleMouseDown(e, "right")}
            style={{
              position: "absolute",
              right: "-6px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "12px",
              height: "40px",
              backgroundColor: "var(--tt-brand-color-500, #49202d)",
              borderRadius: "4px",
              cursor: "ew-resize",
              opacity: 0.9,
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          />
        </>
      )}
    </NodeViewWrapper>
  );
}
