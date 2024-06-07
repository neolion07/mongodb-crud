import { LogEntity } from "../entities/log.entity"
export class LogMapper{
static fromEntity(object:{[key:string]:any}): LogEntity{

        const {
            id,
            date,
            weather,
            location
        } = object;
        
        return new LogEntity(
            id,
            date,
            weather,
            location
        );
    }
}
