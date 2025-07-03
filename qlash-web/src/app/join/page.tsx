"use client"
import Button from '@/components/Button';
import Input from '@/components/Input';
import Navbar from '@/components/Navbar';
import OtpForm from '@/components/forms/OtpForm';
import useGameSocket from '@/hook/useGameSocket';
import { joinGame } from '@/services/socket';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const Join = () => {

  const [username, setUsername] = useState<string>('')
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));

  const gameCode = otp.join('');

  const router = useRouter();

  const isDisabled = !username.trim() || gameCode.length !== 6;

  const handleJoinGame = () => {
    joinGame(username, gameCode);
  }

  useGameSocket("join", (data) => {
    const { success, gameUuid, message } = data;
    if (success) {
      router.push(`/lobby?game=${gameUuid}`);
    } else {
      toast.error(`Impossible de rejoindre la partie : ${message}`);
    }
  });

  return (
    <div className='bg-white h-screen text-black flex flex-row items-center justify-evenly'>
      <Navbar />
      <div className='flex flex-col items-center justify-center h-full'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Join</h2>
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
          <OtpForm
            otp={otp}
            setOtp={setOtp}
            className='mb-4'
            length={6}
          />
          <Button onClick={handleJoinGame} disabled={isDisabled}>
            Rejoindre la partie
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Join