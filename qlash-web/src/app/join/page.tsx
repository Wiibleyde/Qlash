"use client"
import Button from '@/components/Button';
import Input from '@/components/Input';
import Navbar from '@/components/Navbar';
import OtpForm from '@/components/forms/OtpForm';
import useJoin from '@/hook/useJoin';

const Join = () => {

  const { handleJoinGame, isDisabled, otp, setOtp, setUsername, username } = useJoin();

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