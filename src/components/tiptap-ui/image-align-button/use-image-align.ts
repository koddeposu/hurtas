"use client"

import { useCallback, useEffect, useState } from "react"
import { type Editor } from "@tiptap/react"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- Icons ---
import { AlignCenterIcon } from "@/components/tiptap-icons/align-center-icon"
import { AlignLeftIcon } from "@/components/tiptap-icons/align-left-icon"
import { AlignRightIcon } from "@/components/tiptap-icons/align-right-icon"

export type ImageAlign = "left" | "center" | "right"

/**
 * Configuration for the image align functionality
 */
export interface UseImageAlignConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null
  /**
   * The image alignment to apply.
   */
  align: ImageAlign
  /**
   * Callback function called after a successful alignment change.
   */
  onAligned?: () => void
}

export const imageAlignIcons = {
  left: AlignLeftIcon,
  center: AlignCenterIcon,
  right: AlignRightIcon,
}

export const imageAlignLabels: Record<ImageAlign, string> = {
  left: "Sola hizala",
  center: "Ortala",
  right: "Sağa hizala",
}

/**
 * Checks if an image is currently selected
 */
export function isImageSelected(editor: Editor | null): boolean {
  if (!editor) return false
  return editor.isActive("image")
}

/**
 * Gets the current image alignment
 */
export function getImageAlign(editor: Editor | null): ImageAlign | null {
  if (!editor || !isImageSelected(editor)) return null
  const attrs = editor.getAttributes("image")
  return (attrs?.align as ImageAlign) || "center"
}

/**
 * Sets image alignment in the editor
 */
export function setImageAlign(editor: Editor | null, align: ImageAlign): boolean {
  if (!editor || !editor.isEditable) return false
  if (!isImageSelected(editor)) return false

  return editor.chain().focus().updateAttributes("image", { align }).run()
}

/**
 * Custom hook that provides image align functionality for Tiptap editor
 */
export function useImageAlign(config: UseImageAlignConfig) {
  const {
    editor: providedEditor,
    align,
    onAligned,
  } = config

  const { editor } = useTiptapEditor(providedEditor)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<boolean>(false)

  useEffect(() => {
    if (!editor) return

    const handleUpdate = () => {
      const imageSelected = isImageSelected(editor)
      setIsVisible(imageSelected)

      if (imageSelected) {
        const currentAlign = getImageAlign(editor)
        setIsActive(currentAlign === align)
      } else {
        setIsActive(false)
      }
    }

    handleUpdate()

    editor.on("selectionUpdate", handleUpdate)
    editor.on("transaction", handleUpdate)

    return () => {
      editor.off("selectionUpdate", handleUpdate)
      editor.off("transaction", handleUpdate)
    }
  }, [editor, align])

  const handleImageAlign = useCallback(() => {
    if (!editor) return false

    const success = setImageAlign(editor, align)
    if (success) {
      onAligned?.()
    }
    return success
  }, [editor, align, onAligned])

  return {
    isVisible,
    isActive,
    handleImageAlign,
    canAlign: isVisible,
    label: imageAlignLabels[align],
    Icon: imageAlignIcons[align],
  }
}
