"use client";
import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface PuzzleAnswerGridProps {
  options: string[];
  selectedOrder: number[];
  onReorder: (newOrder: number[]) => void;
}

interface SortableItemProps {
  id: string;
  label: string;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, label }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between bg-gray-100 rounded-lg p-4 shadow-md"
    >
      <span className="text-lg font-semibold">{label}</span>
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-500"
        title="Glisser pour réorganiser"
      >
        <GripVertical size={24} />
      </div>
    </div>
  );
};

const PuzzleAnswerGrid: React.FC<PuzzleAnswerGridProps> = ({
  options,
  selectedOrder,
  onReorder,
}) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const ids = selectedOrder.map(String);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = ids.indexOf(active.id.toString());
      const newIndex = ids.indexOf(over.id.toString());

      const newOrder = arrayMove(selectedOrder, oldIndex, newIndex);
      onReorder(newOrder);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className="space-y-3 w-full max-w-3xl mx-auto">
          {selectedOrder.map((originalIdx) => (
            <SortableItem
              key={originalIdx}
              id={originalIdx.toString()}
              label={options[originalIdx]}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default PuzzleAnswerGrid;
