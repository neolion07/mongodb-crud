import { Router } from "express";
import { WeatherController } from "./controller";
import { WeatherService } from "../services/weather.service";
export class WeatherRoutes{
    static get route(): Router{
        const routes = Router();
        const weatherService = new WeatherService();
        const controller = new WeatherController(weatherService);
        // /api/weather
        routes.get('/',controller.findAll);
        routes.get('/:id',controller.findOne);
        routes.put('/:id',controller.update);
        routes.delete('/:id',controller.delete);
        routes.post('/',controller.create);

        return routes;
    }
}
