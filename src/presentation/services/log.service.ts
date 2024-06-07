import { logModel } from "../../data/MongoDB/models/log.model";
import { LogEntity } from "../../domain/entities/log.entity";
import { LogMapper } from "../../domain/mappers/log.mapper";
import { CreateLogDto } from "../../domain/dtos/log/create-log.dto";
import { UpdateLogDto } from "../../domain/dtos/log/update-log.dto";
import { LogPaginationDto } from "../../domain/dtos/log/pagination.dto";

interface FindAllResponse{
    offset: number;
    limit:  number;
    total:  number;
    page:   number;
    logData:    LogEntity[];
}

export class LogService{

    async create(createLogDto: CreateLogDto): Promise<LogEntity>{
        try {
            const log = await logModel.create({...createLogDto});
            if (!log) throw Error(`FATAL: Could not create document`);

            await log.save();
            return LogMapper.fromEntity(log);
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async update(
        updateLogDto: UpdateLogDto, 
        id: string
    ): Promise<LogEntity> {
        try {
            const log = await logModel.findByIdAndUpdate(
            	id,
            	{...updateLogDto},
            	{new: true}
            );
            if (!log) throw Error(`FATAL: Could not find document to update`);
			await log.save();
            return LogMapper.fromEntity(log);
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async delete(id: string): Promise<LogEntity>{
        try {
            const log = await logModel.findOneAndDelete(
                {_id: id}
            );
            if (!log) throw Error(`FATAL: Could not delete document`)
            return LogMapper.fromEntity(log);
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async findOne(id: string): Promise<LogEntity>{
        try {
            const log = await logModel.findById(
                {_id: id}
            );
            if (!log) throw Error(`FATAL: Could not find document`);
            return LogMapper.fromEntity(log);
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async findAll(paginationDto: LogPaginationDto): Promise<FindAllResponse>{
        const {offset, limit} = paginationDto;
        try {
            const [logData, total] = await Promise.all([
                logModel.find({}).skip(offset).limit(limit),
                logModel.find({}).countDocuments()
            ]);
            return {
                offset,
                limit,
                page: (offset <= 0) ? 1 : Math.ceil(offset / limit),
                total,
                logData: logData.map(data => LogMapper.fromEntity(data))
            };
        } catch (error) {
            throw new Error(`FATAL: ${error}`);
        }
    }
}
