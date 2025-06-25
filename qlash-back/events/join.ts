import type { IEvent } from "./events";

const join: IEvent = {
    register: (socket) => {
        socket.on("join", (data) => {
            console.log(data);
        });
    },
}

export default join;