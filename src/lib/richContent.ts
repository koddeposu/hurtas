import type { JSONContent } from "@tiptap/core";

type JsonRecord = Record<string, unknown>;

function isJsonRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null;
}

export function parseTipTapDoc(content: string | null | undefined): JSONContent | null {
  if (!content) return null;

  try {
    const parsed = JSON.parse(content);
    if (
      isJsonRecord(parsed) &&
      parsed.type === "doc" &&
      Array.isArray(parsed.content)
    ) {
      return parsed as JSONContent;
    }
  } catch {
    return null;
  }

  return null;
}

export function toTipTapDocJson(content: string | null | undefined): string {
  const existingDoc = parseTipTapDoc(content);
  if (existingDoc) {
    return JSON.stringify(existingDoc);
  }

  const plainText = (content ?? "").trim();
  const doc: JSONContent = plainText
    ? {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: plainText }],
          },
        ],
      }
    : { type: "doc", content: [] };

  return JSON.stringify(doc);
}

function collectText(node: unknown, chunks: string[]) {
  if (!isJsonRecord(node)) return;

  if (typeof node.text === "string") {
    chunks.push(node.text);
  }

  if (Array.isArray(node.content)) {
    for (const child of node.content) {
      collectText(child, chunks);
    }
  }

  if (
    node.type === "paragraph" ||
    node.type === "heading" ||
    node.type === "listItem" ||
    node.type === "blockquote" ||
    node.type === "codeBlock"
  ) {
    chunks.push("\n");
  }
}

export function extractPlainTextFromRichContent(
  content: string | null | undefined,
): string {
  if (!content) return "";

  const doc = parseTipTapDoc(content);
  if (!doc) {
    return content.replace(/\s+/g, " ").trim();
  }

  const chunks: string[] = [];
  collectText(doc, chunks);

  return chunks
    .join("")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function hasRichContent(content: string | null | undefined): boolean {
  return extractPlainTextFromRichContent(content).length > 0;
}
