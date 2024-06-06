import { envs } from '../config/envs'
import { AppRoutes } from "./routes";
import express from "express";
export class Server{
    private app = express();
    start(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(AppRoutes.route);
        
        this.app.listen(envs.PORT, () => {
            console.log(`Server running on port ${envs.PORT}`);
        });
    }
}
