import { initServer } from "./events/webserver";



export const { io } = initServer(8000);