import { LocationEntity } from "../entities/location.entity"
export class LocationMapper{
static fromEntity(object:{[key:string]:any}): LocationEntity{

        const {
            id,
            city,
            state
        } = object;
        
        return new LocationEntity(
            id,
            city,
            state
        );
    }
}
