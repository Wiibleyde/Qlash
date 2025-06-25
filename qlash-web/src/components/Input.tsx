import React from 'react'

const Input = ({
    ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input {...props} className='w-full p-2 border-b border-black placeholder:text-black' required/>
  )
}

export default Input