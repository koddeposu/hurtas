"use client";

import { useMemo } from "react";
import { ArrowDown, ArrowUp, FileText, Plus, Table2, Trash2 } from "lucide-react";
import { BlogContentEditor } from "@/components/admin/blog-content-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createEmptyProductDetailContent,
  parseProductDetailContent,
  type ProductDetailBlock,
  type ProductDetailContent,
} from "@/lib/productDetailContent";
import { toTipTapDocJson } from "@/lib/richContent";

type ProductDetailContentEditorProps = {
  content: string;
  onChange: (content: string) => void;
};

function createId() {
  return crypto.randomUUID();
}

function createDescriptionBlock(): ProductDetailBlock {
  return {
    id: createId(),
    type: "description",
    content: toTipTapDocJson(""),
  };
}

function createTableBlock(): ProductDetailBlock {
  return {
    id: createId(),
    type: "table",
    title: "",
    headers: ["", ""],
    rows: [["", ""]],
  };
}

function serialize(blocks: ProductDetailBlock[]) {
  return JSON.stringify({
    type: "productDetailContent",
    version: 1,
    blocks,
  } satisfies ProductDetailContent);
}

export function ProductDetailContentEditor({
  content,
  onChange,
}: ProductDetailContentEditorProps) {
  const blocks = useMemo(
    () =>
      parseProductDetailContent(content)?.blocks ??
      createEmptyProductDetailContent().blocks,
    [content],
  );

  const updateBlocks = (nextBlocks: ProductDetailBlock[]) => {
    onChange(serialize(nextBlocks));
  };

  const updateBlock = (blockId: string, nextBlock: ProductDetailBlock) => {
    updateBlocks(
      blocks.map((block) => (block.id === blockId ? nextBlock : block)),
    );
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= blocks.length) return;

    const nextBlocks = [...blocks];
    const [item] = nextBlocks.splice(index, 1);
    nextBlocks.splice(nextIndex, 0, item);
    updateBlocks(nextBlocks);
  };

  const deleteBlock = (blockId: string) => {
    const nextBlocks = blocks.filter((block) => block.id !== blockId);
    updateBlocks(nextBlocks.length > 0 ? nextBlocks : [createDescriptionBlock()]);
  };

  const addColumn = (blockId: string) => {
    const block = blocks.find((item) => item.id === blockId);
    if (!block || block.type !== "table") return;

    updateBlock(blockId, {
      ...block,
      headers: [...block.headers, ""],
      rows: block.rows.map((row) => [...row, ""]),
    });
  };

  const removeColumn = (blockId: string, columnIndex: number) => {
    const block = blocks.find((item) => item.id === blockId);
    if (!block || block.type !== "table" || block.headers.length <= 1) return;

    updateBlock(blockId, {
      ...block,
      headers: block.headers.filter((_, index) => index !== columnIndex),
      rows: block.rows.map((row) =>
        row.filter((_, index) => index !== columnIndex),
      ),
    });
  };

  const addRow = (blockId: string) => {
    const block = blocks.find((item) => item.id === blockId);
    if (!block || block.type !== "table") return;

    updateBlock(blockId, {
      ...block,
      rows: [...block.rows, block.headers.map(() => "")],
    });
  };

  const removeRow = (blockId: string, rowIndex: number) => {
    const block = blocks.find((item) => item.id === blockId);
    if (!block || block.type !== "table" || block.rows.length <= 1) return;

    updateBlock(blockId, {
      ...block,
      rows: block.rows.filter((_, index) => index !== rowIndex),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => updateBlocks([...blocks, createDescriptionBlock()])}
        >
          <FileText className="h-4 w-4" />
          Açıklama Ekle
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => updateBlocks([...blocks, createTableBlock()])}
        >
          <Table2 className="h-4 w-4" />
          Tablo Ekle
        </Button>
      </div>

      <div className="space-y-4">
        {blocks.map((block, blockIndex) => (
          <div
            key={block.id}
            className="rounded-md border border-slate-200 bg-white p-4"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                {block.type === "description" ? (
                  <FileText className="h-4 w-4 text-slate-500" />
                ) : (
                  <Table2 className="h-4 w-4 text-slate-500" />
                )}
                {block.type === "description" ? "Açıklama" : "Tablo"}
              </div>

              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => moveBlock(blockIndex, -1)}
                  disabled={blockIndex === 0}
                  aria-label="Yukarı taşı"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => moveBlock(blockIndex, 1)}
                  disabled={blockIndex === blocks.length - 1}
                  aria-label="Aşağı taşı"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => deleteBlock(block.id)}
                  aria-label="Sil"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
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
                  <table className="w-full min-w-[560px] border-collapse text-sm">
                    <thead>
                      <tr>
                        {block.headers.map((header, columnIndex) => (
                          <th
                            key={`${block.id}-header-${columnIndex}`}
                            className="border border-slate-200 bg-slate-50 p-2 text-left align-top"
                          >
                            <div className="flex gap-2">
                              <Input
                                value={header}
                                onChange={(event) => {
                                  const headers = [...block.headers];
                                  headers[columnIndex] = event.target.value;
                                  updateBlock(block.id, { ...block, headers });
                                }}
                                placeholder="Kolon adı"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                onClick={() =>
                                  removeColumn(block.id, columnIndex)
                                }
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
                            onClick={() => addColumn(block.id)}
                            aria-label="Kolon ekle"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, rowIndex) => (
                        <tr key={`${block.id}-row-${rowIndex}`}>
                          {block.headers.map((_, columnIndex) => (
                            <td
                              key={`${block.id}-cell-${rowIndex}-${columnIndex}`}
                              className="border border-slate-200 p-2 align-top"
                            >
                              <Input
                                value={row[columnIndex] ?? ""}
                                onChange={(event) => {
                                  const rows = block.rows.map((item) => [
                                    ...item,
                                  ]);
                                  rows[rowIndex][columnIndex] =
                                    event.target.value;
                                  updateBlock(block.id, { ...block, rows });
                                }}
                                placeholder="Değer"
                              />
                            </td>
                          ))}
                          <td className="w-12 border border-slate-200 p-2 align-top">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => removeRow(block.id, rowIndex)}
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
                  onClick={() => addRow(block.id)}
                >
                  <Plus className="h-4 w-4" />
                  Satır Ekle
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
