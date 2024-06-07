import { Router } from "express";
import { LogController } from "./controller";
import { LogService } from "../services/log.service";
export class LogRoutes{
    static get route(): Router{
        const routes = Router();
        const logService = new LogService();
        const controller = new LogController(logService);
        // /api/log
        routes.get('/',controller.findAll);
        routes.get('/:id',controller.findOne);
        routes.put('/:id',controller.update);
        routes.delete('/:id',controller.delete);
        routes.post('/',controller.create);

        return routes;
    }
}
