import { v4 as uuidv4 } from 'uuid';
import { games } from '../events/webserver';

export const createGameCode = (): string => {
    const characters = '0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    if (games.some(game => game.code === code)) {
        return createGameCode();
    }
    return code;
};

export const createGameUuid = () => {
    return uuidv4();
};