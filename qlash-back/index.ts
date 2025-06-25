import { initServer } from "./events/webserver";


export const { io } = initServer("localhost", 8000);