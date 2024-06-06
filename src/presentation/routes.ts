import { Router } from "express";
import { WeatherRoutes } from "./weather/route"

export class AppRoutes{
    static get route(): Router{
    const routes = Router();
        routes.use('/api/weather', WeatherRoutes.route);
        /* routes.use('/api/Entity', EntityRoutes.route); */
        return routes;
    }
}