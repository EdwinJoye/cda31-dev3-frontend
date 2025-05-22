import { useState, useEffect, useRef } from "react";
import { TextInput, Select, Group } from "@mantine/core";
import type { Category } from "../models/Category";

interface UserFilterProps {
  onFilter: (filters: {
    name: string;
    category: Category | null;
    text: string;
  }) => void;
  userNames: string[];
}

const UserFilter = ({ onFilter, userNames }: UserFilterProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [text, setText] = useState("");

  const onFilterRef = useRef(onFilter);
  onFilterRef.current = onFilter;

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterRef.current({
        name,
        category,
        text,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [text]);

  useEffect(() => {
    onFilterRef.current({
      name,
      category,
      text,
    });
  }, [name, category]);

  return (
    <Group className="justify-between">
      <TextInput
        placeholder="Chercher un utilisateur"
        value={text}
        className="w-[340px]"
        onChange={(event) => setText(event.currentTarget.value)}
      />
      <Group>
        <Select
          placeholder="Nom"
          data={userNames.map((userName) => ({
            value: userName,
            label: userName,
          }))}
          value={name}
          onChange={(value) => setName(value || "")}
          searchable
          clearable
          rightSection={undefined}
        />
        <Select
          placeholder="Catégorie"
          data={[
            { value: "Marketing", label: "Marketing" },
            { value: "Client", label: "Client" },
            { value: "Technique", label: "Technique" },
          ]}
          value={category}
          onChange={(value) => setCategory(value as Category | null)}
          clearable
          rightSection={undefined}
        />
      </Group>
    </Group>
  );
};

export default UserFilter;
