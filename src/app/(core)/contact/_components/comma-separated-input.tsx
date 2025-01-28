"use client";

// Experimenting
// - Create tags separated by a comma

import { X } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export default function CommaSeparatedInput() {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = e.target.value;
    setInput(currentInputValue);
  };

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const cleanInput = input.toLowerCase().trim();
    const filteredTags = cleanInput
      .split(",")
      .filter((tag) => Boolean(tag.trim()));

    const cleanTags = filteredTags.map((tag) => tag.trim());
    const newTags = Array.from(new Set(cleanTags)).filter(
      (tag) => !tags.includes(tag),
    );

    setTags((prevTags) => [...prevTags, ...newTags]);
    setInput("");
  };

  const handleDelete = (tagToDelete: string) => {
    const filteredTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(filteredTags);
  };
  return (
    <>
      <input
        onChange={handleInputChange}
        onKeyDown={handleSubmit}
        value={input}
      />
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <p
            className="flex w-fit items-center gap-2 rounded-lg border-2 p-2"
            key={tag}
          >
            {tag}
            <X
              className="size-4 cursor-pointer transition hover:text-red-500"
              onClick={() => handleDelete(tag)}
            />
          </p>
        ))}
      </div>
    </>
  );
}
