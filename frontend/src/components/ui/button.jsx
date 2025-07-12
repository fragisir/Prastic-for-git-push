import React from 'react';

const Button = ({ text = "Click Me", onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
