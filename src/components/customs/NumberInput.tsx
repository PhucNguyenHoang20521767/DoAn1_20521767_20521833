import React from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const NumberInput: React.FC<Props> = ({ value, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue >= 1) {
      onChange(newValue);
    }
  };

  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    // value >=1
    if (value <= 1) {
      onChange(1);
      return;
    }
    onChange(value - 1);
  };

  return (
    <div className="flex items-center justify-center font-sans">
      <button
        className="border-gray-300 px-3 pb-1 text-3xl"
        onClick={handleDecrement}
      >
        -
      </button>
      <input
        className="w-16 border border-secondary-0 px-2 py-1 text-center"
        value={value}
        onChange={handleInputChange}
      />
      <button
        className="border-gray-300 px-2 pb-1 text-3xl"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default NumberInput;
