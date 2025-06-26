"use client"
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { socket } from '@/utils/socket';
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar';

const Join = () => {

  const [username, setUsername] = useState<string>('')

  const router = useRouter();

  useEffect(() => {
    socket.on("create", (data) => {
      const { gameUuid } = data;
      router.push(`/lobby?game=${gameUuid}`);
    });
    return () => {
      socket.off("create");
    }
  }, []);

  const handleCreateGame = () => {
    socket.emit("create", { username });
  }

  return (
    <div className='bg-white h-screen text-black flex flex-row items-center justify-evenly'>
      <Navbar />
      <div className='flex flex-col items-center justify-center h-full'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Create</h2>
        <div className='w-96'>
          <div className='mb-4'>
            <Input
              type='text'
              id='username'
              required
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <Button onClick={handleCreateGame}>
            Create Game
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Join