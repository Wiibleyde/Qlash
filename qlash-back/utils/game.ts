import { v4 as uuidv4 } from 'uuid';

export const createGameCode = () => {
    const characters = '0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
};

export const createGameUuid = () => {
    return uuidv4();
};