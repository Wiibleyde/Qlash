import React from "react";

const Button = ({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) => {
  return (
    <button
      {...props}
      className={`w-full bg-[#694aff] text-white p-2 rounded-full hover:opacity-80 cursor-pointer transition duration-300 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
