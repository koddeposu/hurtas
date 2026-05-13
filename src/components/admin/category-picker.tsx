"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronRight, Plus, X } from "lucide-react";
import { useState } from "react";

interface Category {
  id: string;
  parentId: string | null;
  name: string;
  order: number;
}

interface CategoryNode {
  id: string;
  name: string;
  children: CategoryNode[];
}

interface CategoryPickerProps {
  categories: Category[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

function buildTree(categories: Category[]): CategoryNode[] {
  const map: Record<string, CategoryNode> = {};
  categories.forEach(
    (c) => (map[c.id] = { id: c.id, name: c.name, children: [] }),
  );
  const roots: CategoryNode[] = [];
  categories
    .slice()
    .sort((a, b) => a.order - b.order)
    .forEach((c) => {
      if (c.parentId && map[c.parentId]) {
        map[c.parentId].children.push(map[c.id]);
      } else {
        roots.push(map[c.id]);
      }
    });
  return roots;
}

function getDisplayName(id: string, tree: CategoryNode[]): string {
  for (const node of tree) {
    if (node.id === id) return node.name;
    for (const child of node.children) {
      if (child.id === id) return `${node.name} › ${child.name}`;
    }
  }
  return id;
}

export function CategoryPicker({
  categories,
  selectedIds,
  onChange,
}: CategoryPickerProps) {
  const tree = buildTree(categories);
  const [openNodes, setOpenNodes] = useState<Record<string, boolean>>({});

  const toggleOpen = (id: string) =>
    setOpenNodes((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((s) => s !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const clearAll = () => onChange([]);

  return (
    <div className="space-y-3">
      {/* Selection summary */}
      {selectedIds.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          {selectedIds.map((id, i) => (
            <span
              key={id}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
            >
              {i === 0 && (
                <span className="rounded bg-primary/10 px-1 py-0.5 text-[10px] font-semibold text-primary">
                  ANA
                </span>
              )}
              {getDisplayName(id, tree)}
              <button
                type="button"
                onClick={() => toggleSelect(id)}
                className="text-muted-foreground hover:text-foreground"
                aria-label={`${getDisplayName(id, tree)} seçimini kaldır`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-muted-foreground underline hover:text-foreground"
          >
            Tümünü temizle
          </button>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          Henüz kategori seçilmedi
        </p>
      )}

      {/* Tree */}
      <div className="space-y-2">
        {tree.map((parent) => {
          const isOpen = !!openNodes[parent.id];
          const isSelected = selectedIds.includes(parent.id);
          const selectedChildCount = parent.children.filter((c) =>
            selectedIds.includes(c.id),
          ).length;
          const hasChildren = parent.children.length > 0;

          return (
            <div
              key={parent.id}
              className="overflow-hidden rounded-lg border border-border bg-background"
            >
              {/* Parent row */}
              <div className="flex items-center gap-2 px-3 py-2.5">
                {/* Expand toggle */}
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => toggleOpen(parent.id)}
                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border border-border text-muted-foreground transition-transform hover:bg-muted"
                    aria-label={
                      isOpen
                        ? "Alt kategorileri gizle"
                        : "Alt kategorileri göster"
                    }
                  >
                    <ChevronRight
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-150",
                        isOpen && "rotate-90",
                      )}
                    />
                  </button>
                ) : (
                  <div className="h-6 w-6 flex-shrink-0" />
                )}

                {/* Name */}
                <span className="flex-1 text-sm font-medium text-foreground">
                  {parent.name}
                </span>

                {/* Child selection badge */}
                {selectedChildCount > 0 && (
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {selectedChildCount} alt seçili
                  </span>
                )}

                {/* Select button */}
                <button
                  type="button"
                  onClick={() => toggleSelect(parent.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground",
                  )}
                >
                  {isSelected ? (
                    <>
                      <Check className="h-3 w-3" /> Seçildi
                    </>
                  ) : (
                    <>
                      <Plus className="h-3 w-3" /> Seç
                    </>
                  )}
                </button>
              </div>

              {/* Children */}
              {hasChildren && isOpen && (
                <div className="border-t border-border bg-muted/40 px-3 py-3">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Alt Kategoriler
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {parent.children.map((child) => {
                      const childSelected = selectedIds.includes(child.id);
                      return (
                        <button
                          key={child.id}
                          type="button"
                          onClick={() => toggleSelect(child.id)}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                            childSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground",
                          )}
                        >
                          {childSelected ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Plus className="h-3 w-3" />
                          )}
                          {child.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        Birden fazla kategori seçebilirsiniz. İlk seçilen ana kategori olarak
        kullanılır.
      </p>
    </div>
  );
}
