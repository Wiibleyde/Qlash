import create from "./create";
import disconnect from "./disconnect";
import gameEvent from "./game";
import join from "./join";
import startgame from "./startgame";
import synclobby from "./synclobby";
import type { IEvent } from "./webserver";

const events: IEvent[] = [
    join,
    create,
    synclobby,
    startgame,
    gameEvent,
    disconnect
];

export default events;