import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useEffect, useState } from "react";

const Dropdown = ({
  name,
  label,
  options = [],
  onChange,
  placeholder = "Select ingredients...",
  allowCustom = true,
  defaultValue = [],
}) => {
  const [selected, setSelected] = useState(defaultValue);
  const [query, setQuery] = useState("");

  // Update selected values when defaultValue changes
  useEffect(() => {
    setSelected(defaultValue || []);
  }, [defaultValue?.length]);

  const filteredOptions = options.filter(
    (option) =>
      option.toLowerCase().includes(query.toLowerCase()) &&
      !selected.includes(option)
  );

  const isCustomOption =
    allowCustom &&
    query.trim() &&
    !options.some(
      (option) => option.toLowerCase() === query.trim().toLowerCase()
    ) &&
    !selected.some(
      (item) => item.toLowerCase() === query.trim().toLowerCase()
    );

  const handleChange = (values) => {
    setSelected(values);
    onChange?.(values);
    setQuery("");
  };

  const handleRemove = (item) => {
    handleChange(selected.filter((value) => value !== item));
  };

  return (
    <div className="w-full space-y-2">
      {label && <label className="flex gap-0.5">{label}</label>}

      <Combobox
        value={selected}
        onChange={handleChange}
        multiple
        name={name}
      >
        <div className="relative">
          <ComboboxInput
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white p-2 outline-none focus:border-orange-500"
          />

          <ComboboxOptions
            anchor="bottom"
            className="z-50 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md border border-gray-200 bg-white p-1 shadow-lg empty:invisible"
          >
            {filteredOptions.map((option) => (
              <ComboboxOption
                key={option}
                value={option}
                className="cursor-pointer rounded-md px-3 py-2 text-sm data-focus:bg-orange-50"
              >
                {option}
              </ComboboxOption>
            ))}

            {isCustomOption && (
              <ComboboxOption
                value={query.trim()}
                className="cursor-pointer rounded-md px-3 py-2 text-sm text-orange-600 data-focus:bg-orange-50"
              >
                + Add "{query.trim()}"
              </ComboboxOption>
            )}

            {filteredOptions.length === 0 && !isCustomOption && (
              <div className="px-3 py-2 text-sm text-gray-500">
                No ingredients found
              </div>
            )}
          </ComboboxOptions>
        </div>
      </Combobox>

      <div className="flex flex-wrap h-20 items-center gap-2 overflow-auto scrollbar-thin">
        {selected.map((item) => (
          <span
            key={item}
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-orange-50 px-3 py-1 text-sm text-orange-600"
          >
            {item}

            <button
              type="button"
              onClick={() => handleRemove(item)}
              className="font-bold hover:text-red-600"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Hidden inputs for FormData */}
      {selected.map((item) => (
        <input key={item} type="hidden" name={name} value={item} />
      ))}
    </div>
  );
};

export default Dropdown;