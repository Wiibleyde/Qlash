import React from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'

const Join = () => {
  return (
    <div className='bg-white h-screen text-black flex flex-row items-center justify-evenly'>
        <div className='flex flex-col items-center justify-center h-full'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Join</h2>
            <form className='w-96'>
                <div className='mb-4'>
                <Input type='text' id='username' className='w-full p-2 border-b border-black placeholder:text-black' required placeholder='Username'/>
                </div>
                <div className='mb-4'>
                <Input type='text' id='code' className='w-full p-2 border-b border-black placeholder:text-black' required placeholder='Code Pine ta mère'/>
                </div>
                <Button type='submit'>Join Game</Button>
            </form>
        </div>
    </div>
  )
}

export default Join