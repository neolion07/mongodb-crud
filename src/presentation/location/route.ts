import { Router } from "express";
import { LocationController } from "./controller";
import { LocationService } from "../services/location.service";
export class LocationRoutes{
    static get route(): Router{
        const routes = Router();
        const locationService = new LocationService();
        const controller = new LocationController(locationService);
        // /api/location
        routes.get('/',controller.findAll);
        routes.get('/:id',controller.findOne);
        routes.put('/:id',controller.update);
        routes.delete('/:id',controller.delete);
        routes.post('/',controller.create);

        return routes;
    }
}
