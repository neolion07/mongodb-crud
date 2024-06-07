import { Router } from "express";
import { WeatherRoutes } from "./weather/route";
import { LocationRoutes } from "./location/route";
//import { LogRoutes } from "./log/route";
export class AppRoutes{
    static get route(): Router{
    	const routes = Router();
        routes.use('/api/weather', WeatherRoutes.route);
        routes.use('/api/location', LocationRoutes.route);
        /* routes.use('/api/log', EntityRoutes.route); */
        return routes;
    }
}
