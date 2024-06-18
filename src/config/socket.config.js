import { Server } from "socket.io"

const config = (serverHTTP) => {
    const serverIO = new Server(serverHTTP);
};
export default { config }