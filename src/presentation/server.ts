import { envs } from '../config/envs'
import { AppRoutes } from "./routes";
import express from "express";
export class Server{
    private app = express();
    start(){
        this.app.use(AppRoutes.route)
        
        this.app.listen(envs.PORT, () => {
            console.log(`Server running on port ${envs.PORT}`);
        });
    }
}