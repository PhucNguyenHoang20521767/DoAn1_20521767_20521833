import React from "react";

interface IInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
  }
  
  const Input: React.FC<IInputProps> = ({ label, name, value, onChange, error }) => {
    return (
      <div className="mb-1 p-1">
        <label htmlFor={name} className="font-semibold text-base text-gray-700">
          {label}:
        </label>
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-1 placeholder-gray-400 border ${
            error ? "border-red-500" : "border-secondary-1"
          } rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black`}
          required
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  };

    export default Input;