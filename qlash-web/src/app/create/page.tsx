"use client"
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { socket } from '@/utils/socket'

const Join = () => {

  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    socket.on("create", (data) => {
      const { gameCode, gameUuid } = data;
      console.log(`Game created with code: ${gameCode} and UUID: ${gameUuid}`);
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
      <div className='flex flex-col items-center justify-center h-full'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Create</h2>
        <div className='w-96'>
          <div className='mb-4'>
            <Input
              type='text'
              id='username'
              className='w-full p-2 border-b border-black placeholder:text-black'
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