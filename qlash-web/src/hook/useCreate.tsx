import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import useGameSocket from './useGameSocket';
import { createGame } from '@/services/socket';

const useCreate = () => {
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

    return {
        username,
        setUsername,
        handleCreateGame
    };
}

export default useCreate