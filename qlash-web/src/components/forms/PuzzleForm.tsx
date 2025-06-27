"use client";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

type Props = {
  onSubmit: (data: {
    type: string;
    question: string;
    options: string[];
    correctAnswer: string;
  }) => void;
};

interface SortableOptionProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

const SortableOption = ({ id, value, onChange }: SortableOptionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 bg-gray-100 rounded-lg p-3 shadow-md"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-500"
        title="Glisser pour réorganiser"
      >
        <GripVertical size={20} />
      </div>
      <input
        type="text"
        value={value}
        placeholder="Option"
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

const DraggableQuizForm: React.FC<Props> = ({ onSubmit }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { id: "1", value: "" },
    { id: "2", value: "" },
    { id: "3", value: "" },
    { id: "4", value: "" },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = options.findIndex((item) => item.id === active.id);
      const newIndex = options.findIndex((item) => item.id === over.id);
      setOptions((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index].value = value;
    setOptions(updated);
  };

  const handleSubmit = () => {
    const cleanedOptions = options.map((opt) => opt.value.trim()).filter(Boolean);
    if (!question.trim() || cleanedOptions.length < 2) {
      alert("Veuillez remplir la question et au moins deux réponses valides.");
      return;
    }

    onSubmit({
      type: "Classement",
      question: question.trim(),
      options: cleanedOptions,
      correctAnswer: cleanedOptions[0],
    });
  };

  return (
    <div className=" mx-auto p-6 bg-white space-y-4">
      <input
        type="text"
        placeholder="Énoncé de la question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={options.map((o) => o.id)} strategy={verticalListSortingStrategy}>
          <div className="">
            {options.map((opt, index) => (
              <SortableOption
                key={opt.id}
                id={opt.id}
                value={opt.value}
                onChange={(val) => handleOptionChange(index, val)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <p className="text-sm text-gray-600 mt-2">
        👉 Description ordre de haut en bas hihi
      </p>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
      >
        ✅ Ajouter la question
      </button>
    </div>
  );
};

export default DraggableQuizForm;
