import { initServer } from "./events/events";


export const { io } = initServer("localhost", 8000);