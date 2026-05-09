"use client";

import { BlogContentEditor } from "@/components/admin/blog-content-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type LangCode = "tr" | "en" | "ar";

type LangTable = {
  title: string;
  headers: string[];
  rows: string[][];
};

type ProductDetailData = {
  version: 2;
  descriptions: Record<LangCode, string>; // TipTap JSON string per lang
  tables: Record<LangCode, LangTable>;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const LANG_LABELS: Record<LangCode, string> = {
  tr: "Türkçe",
  en: "İngilizce",
  ar: "Arapça",
};

const LANG_CODES: LangCode[] = ["tr", "en", "ar"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function createEmptyTable(): LangTable {
  return { title: "", headers: ["", ""], rows: [["", ""]] };
}

function createEmpty(): ProductDetailData {
  return {
    version: 2,
    descriptions: {
      tr: "",
      en: "",
      ar: "",
    },
    tables: {
      tr: createEmptyTable(),
      en: createEmptyTable(),
      ar: createEmptyTable(),
    },
  };
}

function parse(raw: string): ProductDetailData {
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.version === 2) return parsed as ProductDetailData;
  } catch {}
  return createEmpty();
}

function serialize(data: ProductDetailData): string {
  return JSON.stringify(data);
}

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  content: string;
  onChange: (content: string) => void;
};

// ─── Main Component ───────────────────────────────────────────────────────────

export function ProductDetailContentEditor({ content, onChange }: Props) {
  const data = useMemo(() => parse(content), [content]);

  const update = (next: ProductDetailData) => onChange(serialize(next));

  // ── Description helpers ──
  const setDescription = (lang: LangCode, json: string) =>
    update({
      ...data,
      descriptions: { ...data.descriptions, [lang]: json },
    });

  // ── Table helpers ──
  const setTable = (lang: LangCode, table: LangTable) =>
    update({ ...data, tables: { ...data.tables, [lang]: table } });

  const setHeader = (lang: LangCode, colIdx: number, value: string) => {
    const t = data.tables[lang];
    const headers = t.headers.map((h, i) => (i === colIdx ? value : h));
    setTable(lang, { ...t, headers });
  };

  const setCell = (
    lang: LangCode,
    rowIdx: number,
    colIdx: number,
    value: string,
  ) => {
    const t = data.tables[lang];
    const rows = t.rows.map((row, ri) =>
      ri === rowIdx
        ? row.map((cell, ci) => (ci === colIdx ? value : cell))
        : [...row],
    );
    setTable(lang, { ...t, rows });
  };

  const addColumn = (lang: LangCode) => {
    const t = data.tables[lang];
    setTable(lang, {
      ...t,
      headers: [...t.headers, ""],
      rows: t.rows.map((row) => [...row, ""]),
    });
  };

  const removeColumn = (lang: LangCode, colIdx: number) => {
    const t = data.tables[lang];
    if (t.headers.length <= 1) return;
    setTable(lang, {
      ...t,
      headers: t.headers.filter((_, i) => i !== colIdx),
      rows: t.rows.map((row) => row.filter((_, i) => i !== colIdx)),
    });
  };

  const addRow = (lang: LangCode) => {
    const t = data.tables[lang];
    setTable(lang, {
      ...t,
      rows: [...t.rows, t.headers.map(() => "")],
    });
  };

  const removeRow = (lang: LangCode, rowIdx: number) => {
    const t = data.tables[lang];
    if (t.rows.length <= 1) return;
    setTable(lang, {
      ...t,
      rows: t.rows.filter((_, i) => i !== rowIdx),
    });
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8">
      {/* ── 3 Açıklama ── */}
      {LANG_CODES.map((lang) => (
        <div key={`desc-${lang}`} className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-600">
              {lang}
            </span>
            <span className="text-sm font-semibold text-slate-700">
              {LANG_LABELS[lang]} — Açıklama
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-4">
            <BlogContentEditor
              content={data.descriptions[lang]}
              onChange={(json) => setDescription(lang, json)}
            />
          </div>
        </div>
      ))}

      {/* ── 3 Tablo ── */}
      {LANG_CODES.map((lang) => (
        <div key={`table-${lang}`} className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-600">
              {lang}
            </span>
            <span className="text-sm font-semibold text-slate-700">
              {LANG_LABELS[lang]} — Tablo
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-4">
            <div className="mb-4 space-y-2">
              <Label>Tablo Başlığı</Label>
              <Input
                value={data.tables[lang].title}
                onChange={(e) =>
                  setTable(lang, {
                    ...data.tables[lang],
                    title: e.target.value,
                  })
                }
                placeholder="Örn: Teknik Özellikler"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-sm">
                <thead>
                  <tr>
                    {data.tables[lang].headers.map((header, colIdx) => (
                      <th
                        key={colIdx}
                        className="border border-slate-200 bg-slate-50 p-2 text-left align-top"
                      >
                        <div className="flex gap-2">
                          <Input
                            value={header}
                            onChange={(e) =>
                              setHeader(lang, colIdx, e.target.value)
                            }
                            placeholder="Kolon adı"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => removeColumn(lang, colIdx)}
                            disabled={data.tables[lang].headers.length <= 1}
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
                        onClick={() => addColumn(lang)}
                        aria-label="Kolon ekle"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.tables[lang].rows.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {data.tables[lang].headers.map((_, colIdx) => (
                        <td
                          key={colIdx}
                          className="border border-slate-200 p-2 align-top"
                        >
                          <Input
                            value={row[colIdx] ?? ""}
                            onChange={(e) =>
                              setCell(lang, rowIdx, colIdx, e.target.value)
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
                          onClick={() => removeRow(lang, rowIdx)}
                          disabled={data.tables[lang].rows.length <= 1}
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
              className="mt-3"
              onClick={() => addRow(lang)}
            >
              <Plus className="h-4 w-4" />
              Satır Ekle
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
