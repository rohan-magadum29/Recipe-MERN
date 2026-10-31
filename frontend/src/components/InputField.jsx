import React from "react";

const InputField = ({ name, label, type = "text", defaultValue = "",required,placeholder,onChange,value }) => {
  return (
    <div className="flex flex-col gap-0.5 w-full">
      <label className="flex gap-0.5"> {label} 
        <span className="text-red-500">{required ? "*" : ""}</span>
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className=" rounded-md border border-gray-300 p-1.5 [&::-webkit-inner-spin-button]:appearance-none
    [&::-webkit-outer-spin-button]:appearance-none
    [appearance:textfield]"
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
