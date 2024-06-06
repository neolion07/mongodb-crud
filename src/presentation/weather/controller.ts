import { Request, Response } from "express"
import { IdValidator } from "../../config/id.validator"
import { CreateWeatherDto } from "../../domain/dtos/weather/create-weather.dto";
import { UpdateWeatherDto } from "../../domain/dtos/weather/update-weather.dto";
import { WeatherService } from "../services/weather.service";
import { WeatherPaginationDto } from "../../domain/dtos/weather/pagination.dto";

export class WeatherController{
    constructor(private readonly weatherService:WeatherService){}

    create = (req:Request, res:Response) => {
        const [error, createWeatherDto] = CreateWeatherDto.create(req.body);

        if (error) return res.status(400).json({error});

        this.weatherService.create(createWeatherDto!)
        .then(Weather => res.json(Weather))
        .catch(error => res.status(500).json(error));
    }

    update = (req:Request, res:Response) => {
        const id = req.params.id;
        if (!IdValidator.isValidMongoId(id)) throw Error(`FATAL: Invalid ID`);
        const [error, updateWeatherDto] = UpdateWeatherDto.update(req.body);
        if(error) return res.status(400).json({error});

        this.weatherService.update(updateWeatherDto!, id!)
        .then(Weather => res.json(Weather))
        .catch(error => res.status(500).json(error));
    }

    delete = (req:Request, res:Response) => {
        const id = req.params.id;
        if (!IdValidator.isValidMongoId(id)) throw Error(`FATAL: Invalid ID`); 
        this.weatherService.delete(id!)
        .then(Weather => res.json(Weather))
        .catch(error => res.status(500).json(error))
    }

    findOne = (req:Request,res:Response) => {
        const id = req.params.id;
        if (!IdValidator.isValidMongoId(id)) throw Error(`FATAL: Invalid ID`);
        this.weatherService.findOne(id!)
        .then(Weather =>res.json(Weather))
        .catch(error => res.status(500).json(error));
    }

    findAll = (req:Request, res:Response) => {
        const [error, paginationDto] = WeatherPaginationDto.create(req.query);
        if (error) return res.status(400).json({error});

        this.weatherService.findAll(paginationDto!)
        .then(Weather => res.json(Weather))
        .catch(error => res.status(500).json(error));
    }
}