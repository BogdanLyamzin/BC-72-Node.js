import {initDBConnection} from "./initDBConnection.js";
import startServer from "./server.js";

const bootstrap = async()=> {
    await initDBConnection(process.env.DB_HOST);
    startServer();
}

bootstrap();