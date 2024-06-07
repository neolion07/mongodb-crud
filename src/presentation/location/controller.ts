import { Request, Response } from "express"
import { IdValidator } from "../../config/id.validator"
import { CreateLocationDto } from "../../domain/dtos/location/create-location.dto";
import { UpdateLocationDto } from "../../domain/dtos/location/update-location.dto";
import { LocationService } from "../services/location.service";
import { LocationPaginationDto } from "../../domain/dtos/location/pagination.dto";

export class LocationController{
    constructor(private readonly locationService:LocationService){}

    create = (req:Request, res:Response) => {
        const [error, createLocationDto] = CreateLocationDto.create(req.body);
        if (error) return res.status(400).json({error});
        
        this.locationService.create(createLocationDto!)
        .then(Location => res.status(200).json(Location))
        .catch(error => res.status(500).json({error: "at locationService.create"}));
    }

    update = (req:Request, res:Response) => {
        const id = req.params.id;
        if (!IdValidator.isValidMongoId(id)) throw Error(`FATAL: Invalid ID`);
        const [
        	error,
        	updateLocationDto
        ] = UpdateLocationDto.update({...req.body});
        if(error) return res.status(400).json({error});

        this.locationService.update(updateLocationDto!, id!)
        .then(Location => {
        	console.log(`Updated document (id: ${id})`);
        	res.status(200).json(Location);
        })
        .catch(error => res.status(500).json({error: "at locationService.update"}));
    }

    delete = (req:Request, res:Response) => {
        const id = req.params.id;
        if (!IdValidator.isValidMongoId(id)) throw Error(`FATAL: Invalid ID`); 
        this.locationService.delete(id!)
        .then(Location => {
        	res.status(200).json(Location);
        	console.log(`Deleted document (id: ${id})`);
        })
        .catch(error => res.status(500).json({error}))
    }

    findOne = (req:Request,res:Response) => {
        const id = req.params.id;
        if (!IdValidator.isValidMongoId(id)) throw Error(`FATAL: Invalid ID`);
        this.locationService.findOne(id!)
        .then(Location => res.status(200).json(Location))
        .catch(error => res.status(500).json(error));
    }

    findAll = (req:Request, res:Response) => {
        const [error, paginationDto] = LocationPaginationDto.create(req.query);
        if (error) return res.status(400).json({error});

        this.locationService.findAll(paginationDto!)
        .then(Location => res.status(200).json(Location))
        .catch(error => res.status(500).json(error));
    }
}
