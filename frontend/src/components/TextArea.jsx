import React from "react";

const TextArea = ({ name, label, defaultValue = "",required }) => {
  return (
    <div className="flex flex-col gap-0.5 w-full ">
      <label className="flex gap-0.5"> {label}
        <span className="text-red-500">{required ? "*" : ""}</span>
      </label>
      <textarea
        name={name}
        className=" rounded-md border border-gray-300 p-1.5 h-32"
        defaultValue={defaultValue}
        required={required}
      />
    </div>
  );
};

export default TextArea;
