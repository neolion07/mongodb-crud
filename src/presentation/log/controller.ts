import { Request, Response } from "express"
import { IdValidator } from "../../config/id.validator"
import { CreateLogDto } from "../../domain/dtos/log/create-log.dto";
import { UpdateLogDto } from "../../domain/dtos/log/update-log.dto";
import { LogService } from "../services/log.service";
import { LogPaginationDto } from "../../domain/dtos/log/pagination.dto";

export class LogController{
    constructor(private readonly logService:LogService){}

    create = (req:Request, res:Response) => {
        const [error, createLogDto] = CreateLogDto.create(req.body);
        if (error) return res.status(400).json({error});
        
        this.logService.create(createLogDto!)
        .then(Log => res.status(200).json(Log))
        .catch(error => res.status(500).json({error: "at logService.create"}));
    }

    update = (req:Request, res:Response) => {
        const id = req.params.id;
        if (!IdValidator.isValidMongoId(id)) throw Error(`FATAL: Invalid ID`);
        const [
        	error,
        	updateLogDto
        ] = UpdateLogDto.update({...req.body});
        if(error) return res.status(400).json({error});

        this.logService.update(updateLogDto!, id!)
        .then(Log => {
        	console.log(`Updated document (id: ${id})`);
        	res.status(200).json(Log);
        })
        .catch(error => res.status(500).json({error: "at logService.update"}));
    }

    delete = (req:Request, res:Response) => {
        const id = req.params.id;
        if (!IdValidator.isValidMongoId(id)) throw Error(`FATAL: Invalid ID`); 
        this.logService.delete(id!)
        .then(Log => {
        	res.status(200).json(Log);
        	console.log(`Deleted document (id: ${id})`);
        })
        .catch(error => res.status(500).json({error}))
    }

    findOne = (req:Request,res:Response) => {
        const id = req.params.id;
        if (!IdValidator.isValidMongoId(id)) throw Error(`FATAL: Invalid ID`);
        this.logService.findOne(id!)
        .then(Log => res.status(200).json(Log))
        .catch(error => res.status(500).json(error));
    }

    findAll = (req:Request, res:Response) => {
        const [error, paginationDto] = LogPaginationDto.create(req.query);
        if (error) return res.status(400).json({error});

        this.logService.findAll(paginationDto!)
        .then(Log => res.status(200).json(Log))
        .catch(error => res.status(500).json(error));
    }
}
