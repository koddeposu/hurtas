"use client";

import { BlogContentEditor } from "@/components/admin/blog-content-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  parseProductDetailContent,
  toProductDetailContentJson,
  type ProductDetailBlock,
  type ProductDetailContent,
  type ProductDetailDescriptionBlock,
  type ProductDetailTableBlock,
} from "@/lib/productDetailContent";
import { toTipTapDocJson } from "@/lib/richContent";
import { Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";

type Props = {
  content: string;
  languageLabel: string;
  onChange: (content: string) => void;
};

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `block-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createDescriptionBlock(): ProductDetailDescriptionBlock {
  return {
    id: createId(),
    type: "description",
    content: toTipTapDocJson(""),
  };
}

function createTableBlock(): ProductDetailTableBlock {
  return {
    id: createId(),
    type: "table",
    title: "",
    headers: ["", ""],
    rows: [["", ""]],
  };
}

function parseEditorContent(content: string): ProductDetailContent {
  const normalized = parseProductDetailContent(toProductDetailContentJson(content));
  const descriptionBlock =
    normalized?.blocks.find(
      (block): block is ProductDetailDescriptionBlock =>
        block.type === "description",
    ) ?? createDescriptionBlock();
  const tableBlock =
    normalized?.blocks.find(
      (block): block is ProductDetailTableBlock => block.type === "table",
    ) ?? createTableBlock();

  return {
    type: "productDetailContent",
    version: 1,
    blocks: [descriptionBlock, tableBlock],
  };
}

function serialize(data: ProductDetailContent) {
  return JSON.stringify(data);
}

export function ProductDetailContentEditor({
  content,
  languageLabel,
  onChange,
}: Props) {
  const data = useMemo(() => parseEditorContent(content), [content]);

  const update = (next: ProductDetailContent) => onChange(serialize(next));

  const updateBlock = (blockId: string, nextBlock: ProductDetailBlock) => {
    update({
      ...data,
      blocks: data.blocks.map((block) =>
        block.id === blockId ? nextBlock : block,
      ),
    });
  };

  const setHeader = (
    block: ProductDetailTableBlock,
    colIdx: number,
    value: string,
  ) => {
    updateBlock(block.id, {
      ...block,
      headers: block.headers.map((header, index) =>
        index === colIdx ? value : header,
      ),
    });
  };

  const setCell = (
    block: ProductDetailTableBlock,
    rowIdx: number,
    colIdx: number,
    value: string,
  ) => {
    updateBlock(block.id, {
      ...block,
      rows: block.rows.map((row, rowIndex) =>
        rowIndex === rowIdx
          ? block.headers.map((_, columnIndex) =>
              columnIndex === colIdx ? value : (row[columnIndex] ?? ""),
            )
          : block.headers.map((_, columnIndex) => row[columnIndex] ?? ""),
      ),
    });
  };

  const addColumn = (block: ProductDetailTableBlock) => {
    updateBlock(block.id, {
      ...block,
      headers: [...block.headers, ""],
      rows: block.rows.map((row) => [...row, ""]),
    });
  };

  const removeColumn = (block: ProductDetailTableBlock, colIdx: number) => {
    if (block.headers.length <= 1) return;

    updateBlock(block.id, {
      ...block,
      headers: block.headers.filter((_, index) => index !== colIdx),
      rows: block.rows.map((row) =>
        row.filter((_, index) => index !== colIdx),
      ),
    });
  };

  const addRow = (block: ProductDetailTableBlock) => {
    updateBlock(block.id, {
      ...block,
      rows: [...block.rows, block.headers.map(() => "")],
    });
  };

  const removeRow = (block: ProductDetailTableBlock, rowIdx: number) => {
    if (block.rows.length <= 1) return;

    updateBlock(block.id, {
      ...block,
      rows: block.rows.filter((_, index) => index !== rowIdx),
    });
  };

  return (
    <div className="space-y-4">
      {data.blocks.map((block, index) => (
        <div
          key={block.id}
          className="space-y-3 rounded-md border border-slate-200 bg-white p-4"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-600">
              {index + 1}
            </span>
            <span className="text-sm font-semibold text-slate-700">
              {languageLabel} {block.type === "description" ? "Açıklama" : "Tablo"}
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {block.type === "description" ? (
            <BlogContentEditor
              content={block.content}
              onChange={(json) =>
                updateBlock(block.id, { ...block, content: json })
              }
            />
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tablo Başlığı</Label>
                <Input
                  value={block.title}
                  onChange={(event) =>
                    updateBlock(block.id, {
                      ...block,
                      title: event.target.value,
                    })
                  }
                  placeholder="Örn: Teknik Özellikler"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] border-collapse text-sm">
                  <thead>
                    <tr>
                      {block.headers.map((header, colIdx) => (
                        <th
                          key={colIdx}
                          className="border border-slate-200 bg-slate-50 p-2 text-left align-top"
                        >
                          <div className="flex gap-2">
                            <Input
                              value={header}
                              onChange={(event) =>
                                setHeader(block, colIdx, event.target.value)
                              }
                              placeholder="Kolon adı"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => removeColumn(block, colIdx)}
                              disabled={block.headers.length <= 1}
                              aria-label="Kolonu sil"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </th>
                      ))}
                      <th className="w-12 border border-slate-200 bg-slate-50 p-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => addColumn(block)}
                          aria-label="Kolon ekle"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {block.headers.map((_, colIdx) => (
                          <td
                            key={colIdx}
                            className="border border-slate-200 p-2 align-top"
                          >
                            <Input
                              value={row[colIdx] ?? ""}
                              onChange={(event) =>
                                setCell(
                                  block,
                                  rowIdx,
                                  colIdx,
                                  event.target.value,
                                )
                              }
                              placeholder="Değer"
                            />
                          </td>
                        ))}
                        <td className="w-12 border border-slate-200 p-2 align-top">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => removeRow(block, rowIdx)}
                            disabled={block.rows.length <= 1}
                            aria-label="Satırı sil"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addRow(block)}
              >
                <Plus className="h-4 w-4" />
                Satır Ekle
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
