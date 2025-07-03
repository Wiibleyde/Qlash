"use client"
import Button from '@/components/Button';
import Input from '@/components/Input';
import Navbar from '@/components/Navbar';
import useGameSocket from '@/hook/useGameSocket';
import { createGame } from '@/services/socket';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const Create = () => {

  const [username, setUsername] = useState<string>('')

  const router = useRouter();

  useGameSocket("create", (data) => {
    const { success, gameUuid } = data;
    if (success) {
      router.push(`/lobby?game=${gameUuid}`);
    } else {
      toast.error("Impossible de créer la partie, le nom d'utilisateur est requis.");
    }
  });

  const handleCreateGame = () => {
    createGame(username);
  }

  return (
    <div className='bg-white h-screen text-black flex flex-row items-center justify-evenly'>
      <Navbar />
      <div className='flex flex-col items-center justify-center h-full'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Créer une partie</h2>
        <div className='w-96'>
          <div className='mb-4'>
            <Input
              type='text'
              id='username'
              required
              placeholder='Nom d’utilisateur'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <Button onClick={handleCreateGame} disabled={!username.trim()}>
            Créer une partie
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Create