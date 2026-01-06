"use client";

import { useState, useMemo, createContext, useContext } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";

export interface SortableItem {
  id: string;
  [key: string]: unknown;
}

// Context for passing edit mode and item IDs down
interface SortableContextValue {
  isEditMode: boolean;
  itemIds: string[];
}

const SortableTableContext = createContext<SortableContextValue>({
  isEditMode: false,
  itemIds: [],
});

interface SortableRowProps {
  id: string;
  children: React.ReactNode;
}

export function SortableRow({ id, children }: SortableRowProps) {
  const { isEditMode } = useContext(SortableTableContext);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: !isEditMode });

  const style = isEditMode
    ? {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <TableRow ref={setNodeRef} style={style}>
      {isEditMode && (
        <TableCell className="w-10 px-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-slate-100 rounded transition-colors"
            type="button"
          >
            <GripVertical className="h-4 w-4 text-slate-400" />
          </button>
        </TableCell>
      )}
      {children}
    </TableRow>
  );
}

interface SortableTableWrapperProps<T extends SortableItem> {
  items: T[];
  isEditMode: boolean;
  onOrderChange: (items: T[]) => void;
  children: React.ReactNode;
}

export function SortableTableWrapper<T extends SortableItem>({
  items,
  isEditMode,
  onOrderChange,
  children,
}: SortableTableWrapperProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const itemIds = useMemo(() => items.map((item) => item.id), [items]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      onOrderChange(newItems);
    }
  };

  const contextValue = useMemo(
    () => ({ isEditMode, itemIds }),
    [isEditMode, itemIds],
  );

  if (!isEditMode) {
    return (
      <SortableTableContext.Provider value={contextValue}>
        {children}
      </SortableTableContext.Provider>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <SortableTableContext.Provider value={contextValue}>
          {children}
        </SortableTableContext.Provider>
      </SortableContext>
    </DndContext>
  );
}

export function useSortableTable<T extends SortableItem>(initialItems: T[]) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalItems, setOriginalItems] = useState<T[]>(initialItems);

  const handleOrderChange = (newItems: T[]) => {
    setItems(newItems);
    setHasChanges(true);
  };

  const startEditMode = () => {
    setOriginalItems([...items]);
    setIsEditMode(true);
    setHasChanges(false);
  };

  const cancelEditMode = () => {
    setItems(originalItems);
    setIsEditMode(false);
    setHasChanges(false);
  };

  const getOrderedItems = () => {
    return items.map((item, index) => ({
      id: item.id,
      order: index,
    }));
  };

  return {
    items,
    setItems,
    isEditMode,
    setIsEditMode,
    hasChanges,
    setHasChanges,
    handleOrderChange,
    startEditMode,
    cancelEditMode,
    getOrderedItems,
  };
}

// Hook to check if we're in edit mode from any child component
export function useSortableTableContext() {
  return useContext(SortableTableContext);
}
