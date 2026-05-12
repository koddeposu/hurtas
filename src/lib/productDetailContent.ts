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
type LegacyLangCode = "tr" | "en" | "ar";

const LEGACY_LANG_CODES: LegacyLangCode[] = ["tr", "en", "ar"];

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

function hasTableContent(table: ProductDetailTableBlock) {
  return (
    table.title.trim().length > 0 ||
    table.headers.some((header) => header.trim().length > 0) ||
    table.rows.some((row) => row.some((cell) => cell.trim().length > 0))
  );
}

function hasBlockContent(block: ProductDetailBlock) {
  if (block.type === "description") {
    return extractPlainTextFromRichContent(block.content).length > 0;
  }

  return hasTableContent(block);
}

function normalizeLegacyV2Content(parsed: JsonRecord): ProductDetailContent | null {
  if (parsed.version !== 2) return null;

  const descriptions = isJsonRecord(parsed.descriptions)
    ? parsed.descriptions
    : {};
  const tables = isJsonRecord(parsed.tables) ? parsed.tables : {};
  const blocks: ProductDetailBlock[] = [];

  const description = LEGACY_LANG_CODES.map((lang) => descriptions[lang]).find(
    (value) =>
      typeof value === "string" &&
      extractPlainTextFromRichContent(value).length > 0,
  );

  if (typeof description === "string") {
    blocks.push({
      id: createId(),
      type: "description",
      content: toTipTapDocJson(description),
    });
  }

  for (const lang of LEGACY_LANG_CODES) {
    const table = tables[lang];
    if (!isJsonRecord(table)) continue;

    const normalizedTable = normalizeTableBlock(table);
    if (hasTableContent(normalizedTable)) {
      blocks.push(normalizedTable);
      break;
    }
  }

  return {
    type: "productDetailContent",
    version: 1,
    blocks,
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

    const legacyV2Content = isJsonRecord(parsed)
      ? normalizeLegacyV2Content(parsed)
      : null;
    if (legacyV2Content) return legacyV2Content;
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

  return detailContent.blocks.some(hasBlockContent);
}

export function toProductDetailStorageJson(
  content: string | null | undefined,
): string {
  const detailContent = parseProductDetailContent(content);

  if (!detailContent) {
    const legacyDoc = parseTipTapDoc(content);
    return legacyDoc ? JSON.stringify(legacyDoc) : toTipTapDocJson(content);
  }

  const blocksWithContent = detailContent.blocks.filter(hasBlockContent);

  if (
    blocksWithContent.length === 1 &&
    blocksWithContent[0].type === "description"
  ) {
    return blocksWithContent[0].content;
  }

  return JSON.stringify({
    ...detailContent,
    blocks: blocksWithContent,
  } satisfies ProductDetailContent);
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
