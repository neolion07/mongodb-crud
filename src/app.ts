import { MongoDBClient } from './data/MongoDB/client'
import { Server } from './presentation/server'

(async () => { main(); })();

async function main(){
    // Create a client to connect to MongoDB:
    await MongoDBClient.connection();
    // Create a server instance and start it:
    const server = new Server();
    server.start();
}