import { startGameErrorTranslations } from '@/constants/error';
import { socket } from '@/utils/socket';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { SimplePlayer } from '../../../qlash-shared/types/user';
import useGameSocket from './useGameSocket';

function translateError(msg: string) {
    return startGameErrorTranslations[msg] || msg;
}

const useLobby = (game: string) => {
    const router = useRouter();
    const [players, setPlayers] = useState<SimplePlayer[]>([]);
    const [code, setCode] = useState<string | null>(null);
    const [isHost, setIsHost] = useState<boolean>(false);

    const [selectedPresets, setSelectedPresets] = useState<{ id: string; name: string }[]>([]);
    const [selectingPreset, setSelectingPreset] = useState(false);

    useGameSocket("synclobby", (data) => {
        if (!data) return;
        const { success, players: playersInLobby, gameCode } = data;
        if (success) {
            setIsHost(playersInLobby.some((player: SimplePlayer) => player.socketId === socket.id && player.isHost));
            setPlayers(playersInLobby);
            setCode(gameCode);
        } else {
            toast.error("Erreur lors de la synchronisation des joueurs dans la salle.");
        }
    });

    useGameSocket("startgame", (data) => {
        const { success, message, gameId } = data;
        if (success) {
            toast.success(translateError(message));
            router.push(`/game?game=${gameId}`);
        } else {
            toast.error(translateError(message));
        }
    });

    useEffect(() => {
        socket.emit("synclobby", { gameUuid: game });
    }, [game]);

    return {
        players,
        code,
        isHost,
        selectedPresets,
        selectingPreset,
        setSelectingPreset,
        setSelectedPresets,
    };
}

export default useLobby