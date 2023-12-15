import React from "react";

interface IInputProps {
  label?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<IInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="m-1 block w-full p-2">
      {label && (
        <label className="text-base font-semibold text-gray-700">
          {label}:
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        // className={`w-full appearance-none rounded-sm border px-3 py-1 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black`}
        className={`w-full appearance-none rounded-sm border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black 
        sm:break-words`}
        required
      />
      {/* {error && <span className="text-red-500 text-sm">{error}</span>} */}
    </div>
  );
};

export default Input;
