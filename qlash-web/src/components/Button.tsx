import React from "react";

const Button = ({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) => {
  return (
    <button
      {...props}
      className={`w-full text-white p-2 rounded-full bg-[#694aff] ${props.disabled ? "opacity-50 cursor-not-allowed" :"hover:opacity-80 cursor-pointer"}  transition duration-300 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
