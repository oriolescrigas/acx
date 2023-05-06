import React, { useState } from 'react';

const SwitchButtonDisabled = ({ label, isChecked }) => {
  const [checked, setChecked] = useState(isChecked);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <div className="flex items-center">
      <label htmlFor="switch" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="switch"
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={handleChange}
          />
          <div className="block w-8 h-4 rounded-full bg-gray-200" ></div>
          <div
            className="dot absolute left-1 top-1 bg-white w-2 h-2 rounded-full"
          ></div>
        </div>
        <div className="ml-3 text-gray-700 font-medium">{label}</div>
      </label>
    </div>
  );
};

export default SwitchButtonDisabled;
