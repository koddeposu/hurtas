import { Image } from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ResizableImageNodeView } from "./resizable-image-node";

export const ResizableImage = Image.extend({
  name: "image",

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => {
          const width =
            element.getAttribute("width") ||
            element.style.width?.replace("px", "");
          return width ? Number(width) : null;
        },
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return {
            width: attributes.width,
            style: `width: ${attributes.width}px`,
          };
        },
      },
      align: {
        default: "center",
        parseHTML: (element) =>
          element.getAttribute("data-align") || "center",
        renderHTML: (attributes) => {
          return { "data-align": attributes.align };
        },
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageNodeView);
  },
});
