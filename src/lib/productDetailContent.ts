import type { JSONContent } from "@tiptap/core";
import {
  extractPlainTextFromRichContent,
  parseTipTapDoc,
  toTipTapDocJson,
} from "@/lib/richContent";

export type ProductDetailDescriptionBlock = {
  id: string;
  type: "description";
  content: string;
};

export type ProductDetailTableBlock = {
  id: string;
  type: "table";
  title: string;
  headers: string[];
  rows: string[][];
};

export type ProductDetailBlock =
  | ProductDetailDescriptionBlock
  | ProductDetailTableBlock;

export type ProductDetailContent = {
  type: "productDetailContent";
  version: 1;
  blocks: ProductDetailBlock[];
};

type JsonRecord = Record<string, unknown>;

function isJsonRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null;
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `block-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeDescriptionBlock(block: JsonRecord): ProductDetailDescriptionBlock {
  return {
    id: typeof block.id === "string" ? block.id : createId(),
    type: "description",
    content:
      typeof block.content === "string"
        ? toTipTapDocJson(block.content)
        : toTipTapDocJson(""),
  };
}

function normalizeTableBlock(block: JsonRecord): ProductDetailTableBlock {
  const headers =
    Array.isArray(block.headers) && block.headers.length > 0
      ? block.headers.map((item) => String(item ?? ""))
      : ["", ""];

  const rows =
    Array.isArray(block.rows) && block.rows.length > 0
      ? block.rows.map((row) =>
          Array.isArray(row)
            ? headers.map((_, index) => String(row[index] ?? ""))
            : headers.map(() => ""),
        )
      : [headers.map(() => "")];

  return {
    id: typeof block.id === "string" ? block.id : createId(),
    type: "table",
    title: typeof block.title === "string" ? block.title : "",
    headers,
    rows,
  };
}

export function createEmptyProductDetailContent(): ProductDetailContent {
  return {
    type: "productDetailContent",
    version: 1,
    blocks: [
      {
        id: createId(),
        type: "description",
        content: toTipTapDocJson(""),
      },
    ],
  };
}

export function parseProductDetailContent(
  content: string | null | undefined,
): ProductDetailContent | null {
  if (!content) return null;

  try {
    const parsed = JSON.parse(content);
    if (
      isJsonRecord(parsed) &&
      parsed.type === "productDetailContent" &&
      Array.isArray(parsed.blocks)
    ) {
      const blocks = parsed.blocks
        .filter(isJsonRecord)
        .map((block) => {
          if (block.type === "description") {
            return normalizeDescriptionBlock(block);
          }
          if (block.type === "table") {
            return normalizeTableBlock(block);
          }
          return null;
        })
        .filter((block): block is ProductDetailBlock => block !== null);

      return {
        type: "productDetailContent",
        version: 1,
        blocks,
      };
    }
  } catch {
    return null;
  }

  return null;
}

export function toProductDetailContentJson(
  content: string | null | undefined,
): string {
  const existing = parseProductDetailContent(content);
  if (existing) {
    return JSON.stringify(existing);
  }

  const legacyDoc = parseTipTapDoc(content);
  if (legacyDoc || content?.trim()) {
    const block: ProductDetailDescriptionBlock = {
      id: createId(),
      type: "description",
      content: legacyDoc
        ? JSON.stringify(legacyDoc)
        : toTipTapDocJson(content ?? ""),
    };

    return JSON.stringify({
      type: "productDetailContent",
      version: 1,
      blocks: [block],
    } satisfies ProductDetailContent);
  }

  return JSON.stringify(createEmptyProductDetailContent());
}

export function hasProductDetailContent(
  content: string | null | undefined,
): boolean {
  const detailContent = parseProductDetailContent(content);
  if (!detailContent) {
    return extractPlainTextFromRichContent(content).length > 0;
  }

  return detailContent.blocks.some((block) => {
    if (block.type === "description") {
      return extractPlainTextFromRichContent(block.content).length > 0;
    }

    return (
      block.title.trim().length > 0 ||
      block.headers.some((header) => header.trim().length > 0) ||
      block.rows.some((row) => row.some((cell) => cell.trim().length > 0))
    );
  });
}

export function extractPlainTextFromProductDetailContent(
  content: string | null | undefined,
): string {
  const detailContent = parseProductDetailContent(content);
  if (!detailContent) {
    return extractPlainTextFromRichContent(content);
  }

  const chunks: string[] = [];

  for (const block of detailContent.blocks) {
    if (block.type === "description") {
      const text = extractPlainTextFromRichContent(block.content);
      if (text) chunks.push(text);
    } else {
      if (block.title.trim()) chunks.push(block.title.trim());
      const tableText = [
        ...block.headers,
        ...block.rows.flat(),
      ]
        .map((value) => value.trim())
        .filter(Boolean)
        .join(" ");
      if (tableText) chunks.push(tableText);
    }
  }

  return chunks.join("\n\n").trim();
}

export function isTipTapJsonContent(content: string): content is string {
  return Boolean(parseTipTapDoc(content) as JSONContent | null);
}
