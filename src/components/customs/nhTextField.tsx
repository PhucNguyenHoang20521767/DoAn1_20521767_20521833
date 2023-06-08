import React from "react";

interface IInputProps {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const Input: React.FC<IInputProps> = ({ label, value, onChange }) => {
    return (
      <div className="mb-1 p-1">
        <label className="font-semibold text-base text-gray-700">
          {label}:
        </label>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-1 placeholder-gray-400 border rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black`}
          required
        />
        {/* {error && <span className="text-red-500 text-sm">{error}</span>} */}
      </div>
    );
  };

    export default Input;