"use client";

import { useState } from "react";
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
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X, Upload, Loader2, Pencil } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface SortableImage {
  id: string;
  url: string;
  alt: string;
  order: number;
}

interface SortableImageItemProps {
  image: SortableImage;
  onDelete: (id: string) => void;
  onEditAlt?: (id: string, currentAlt: string) => void;
}

function SortableImageItem({ image, onDelete, onEditAlt }: SortableImageItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative group aspect-square rounded-lg overflow-hidden border bg-white",
        isDragging && "opacity-50 ring-2 ring-primary shadow-lg z-50"
      )}
    >
      {/* Drag handle - top left */}
      <button
        {...attributes}
        {...listeners}
        type="button"
        className="absolute top-2 left-2 p-1 bg-black/50 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      {/* Image */}
      <Image
        src={image.url}
        alt={image.alt}
        fill
        className="object-cover pointer-events-none"
      />

      {/* Delete button - top right */}
      <button
        type="button"
        onClick={() => onDelete(image.id)}
        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Edit alt text button - bottom left */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-2 bg-black/65 px-2 py-1.5 text-white">
        <span className="min-w-0 flex-1 truncate text-[11px]">
          {image.alt?.trim() ? image.alt : "Alt metin girilmedi"}
        </span>
        {onEditAlt && (
          <button
            type="button"
            onClick={() => onEditAlt(image.id, image.alt)}
            className="rounded bg-white/15 p-1 transition-colors hover:bg-white/25"
            title="Alt metin düzenle"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

interface SortableImageGridProps {
  images: SortableImage[];
  onReorder: (images: SortableImage[]) => void;
  onDelete: (id: string) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  onEditAlt?: (id: string, currentAlt: string) => void;
}

export function SortableImageGrid({
  images,
  onReorder,
  onDelete,
  onUpload,
  isUploading,
  onEditAlt,
}: SortableImageGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over.id);
      const reorderedImages = arrayMove(images, oldIndex, newIndex).map(
        (img, index) => ({
          ...img,
          order: index,
        })
      );
      onReorder(reorderedImages);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={images.map((img) => img.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image) => (
            <SortableImageItem
              key={image.id}
              image={image}
              onDelete={onDelete}
              onEditAlt={onEditAlt}
            />
          ))}

          {/* Upload button */}
          <label className="aspect-square rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={onUpload}
              disabled={isUploading}
            />
            {isUploading ? (
              <Loader2 className="h-8 w-8 text-slate-400 animate-spin" />
            ) : (
              <>
                <Upload className="h-8 w-8 text-slate-400 mb-2" />
                <span className="text-xs text-slate-500">Görsel Ekle</span>
              </>
            )}
          </label>
        </div>
      </SortableContext>
    </DndContext>
  );
}
