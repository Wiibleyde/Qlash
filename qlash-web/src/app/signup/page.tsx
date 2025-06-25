import React from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'

const SignUp = () => {
  return (
    <div className='bg-white h-screen text-black flex flex-row items-center justify-evenly'>
        <div className='flex flex-col items-center justify-center h-full'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Sign Up</h2>
            <form className='w-96'>
                <div className='mb-4'>
                <Input type='text' id='username' className='w-full p-2 border-b border-black placeholder:text-black' required placeholder='Username'/>
                </div>
                <div className='mb-4'>
                <Input type='email' id='email' className='w-full p-2 border-b border-black placeholder:text-black' required placeholder='Email'/>
                </div>
                <div className='mb-4'>
                <Input type='password' id='password' className='w-full p-2 border-b border-black placeholder:text-black' required placeholder='Password'/>
                </div>
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
        <div className='border-l border-gray-400 h-96'/>
        <div className='flex flex-col items-center justify-center h-full'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Sign In</h2>
            <form className='w-96'>
                <div className='mb-4'>
                <Input type='email' id='email' className='w-full p-2 border-b border-black placeholder:text-black' required placeholder='Email'/>
                </div>
                <div className='mb-4'>
                <Input type='password' id='password' className='w-full p-2 border-b border-black placeholder:text-black' required placeholder='Password'/>
                </div>
                <Button type='submit'>Sign In</Button>
            </form>
        </div>
    </div>
  )
}

export default SignUp