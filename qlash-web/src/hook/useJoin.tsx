import { joinGame } from '@/services/socket';
import React, { useState } from 'react'
import useGameSocket from './useGameSocket';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const useJoin = () => {
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

    return {
        username,
        setUsername,
        otp,
        setOtp,
        gameCode,
        isDisabled,
        handleJoinGame
    };
}

export default useJoin