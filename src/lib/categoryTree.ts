export type CategoryTreeItem = {
  id: string;
  name: string;
  parentId: string | null;
  order: number;
};

export type CategoryOption<T extends CategoryTreeItem = CategoryTreeItem> = {
  category: T;
  depth: number;
  label: string;
};

export function buildCategoryOptions<T extends CategoryTreeItem>(
  categories: T[],
  excludedId?: string,
): CategoryOption<T>[] {
  const childrenByParent = new Map<string | null, T[]>();

  for (const category of categories) {
    if (category.id === excludedId) continue;

    const key = category.parentId ?? null;
    const children = childrenByParent.get(key) ?? [];
    children.push(category);
    childrenByParent.set(key, children);
  }

  for (const children of childrenByParent.values()) {
    children.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, "tr"));
  }

  const options: CategoryOption<T>[] = [];
  const visited = new Set<string>();

  const visit = (parentId: string | null, depth: number) => {
    const children = childrenByParent.get(parentId) ?? [];

    for (const category of children) {
      if (visited.has(category.id)) continue;
      visited.add(category.id);
      options.push({
        category,
        depth,
        label: `${"-- ".repeat(depth)}${category.name}`,
      });
      visit(category.id, depth + 1);
    }
  };

  visit(null, 0);

  for (const category of categories) {
    if (category.id === excludedId || visited.has(category.id)) continue;
    options.push({
      category,
      depth: 0,
      label: category.name,
    });
  }

  return options;
}
