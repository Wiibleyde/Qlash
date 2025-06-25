import React from 'react'

const Button = ({
    children, 
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props} className='w-full bg-[#694aff] text-white p-2 rounded-full hover:opacity-85'>{children}</button>
  )
}

export default Button