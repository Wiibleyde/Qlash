import type { Socket } from "socket.io";

const join = (socket: Socket) => {
    socket.on("join", (data) => {
        console.log(data);
    });
}

export default join;