"use client"
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { socket } from '@/utils/socket'
import { toast } from 'sonner'

const Join = () => {

  const [username, setUsername] = useState<string>('')
  const [gameCode, setGameCode] = useState<string>('')

  const handleJoinGame = () => {
    socket.emit("join", { username, gameCode });
  }

  useEffect(() => {
    socket.on("join", (data) => {
      const { joined, gameCode, gameUuid, message } = data;
      if (joined) {
        console.log(`Joined game with code: ${gameCode} and UUID: ${gameUuid}`);
        // Redirect to game page or update UI accordingly
      } else {
        toast.error(`Failed to join game: the information provided is incorrect or the game does not exist.`);
        console.error(`Failed to join game: ${message}`);
        // Show error message to user
      }
    });
    return () => {
      socket.off("join");
    }
  }, []);

  return (
    <div className='bg-white h-screen text-black flex flex-row items-center justify-evenly'>
      <div className='flex flex-col items-center justify-center h-full'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Join</h2>
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
          <div className='mb-4'>
            <Input
              type='text'
              id='code'
              required
              placeholder='Code Pine ta mère'
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value)}
            />
          </div>
          <Button onClick={handleJoinGame}>
            Join Game
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Join