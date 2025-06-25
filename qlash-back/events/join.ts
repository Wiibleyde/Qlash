import type { IEvent } from ".";

const join: IEvent = {
    register: (socket) => {
        socket.on("join", (data) => {
            console.log(data);
        });
    },
}

export default join;