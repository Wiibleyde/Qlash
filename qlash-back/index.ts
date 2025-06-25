import { initServer } from "./events";


export const { io } = initServer("localhost", 8000);