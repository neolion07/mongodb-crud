import { locationModel } from "../../data/MongoDB/models/location.model";
import { LocationEntity } from "../../domain/entities/location.entity";
import { LocationMapper } from "../../domain/mappers/location.mapper";
import { CreateLocationDto } from "../../domain/dtos/location/create-location.dto";
import { UpdateLocationDto } from "../../domain/dtos/location/update-location.dto";
import { LocationPaginationDto } from "../../domain/dtos/location/pagination.dto";

interface FindAllResponse{
    offset: number;
    limit:  number;
    total:  number;
    page:   number;
    locationData:    LocationEntity[];
}

export class LocationService{

    async create(createLocationDto: CreateLocationDto): Promise<LocationEntity>{
        try {
            const location = await locationModel.create({...createLocationDto});
            if (!location) throw Error(`FATAL: Could not create document`);

            await location.save();
            return LocationMapper.fromEntity(location);
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async update(
        updateLocationDto: UpdateLocationDto, 
        id: string
    ): Promise<LocationEntity> {
        try {
            const location = await locationModel.findByIdAndUpdate(
            	id,
            	{...updateLocationDto},
            	{new: true}
            );
            if (!location) throw Error(`FATAL: Could not find document to update`);
			await location.save();
            return LocationMapper.fromEntity(location);
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async delete(id: string): Promise<LocationEntity>{
        try {
            const location = await locationModel.findOneAndDelete(
                {_id: id}
            );
            if (!location) throw Error(`FATAL: Could not delete document`)
            return LocationMapper.fromEntity(location);
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async findOne(id: string): Promise<LocationEntity>{
        try {
            const location = await locationModel.findById(
                {_id: id}
            );
            if (!location) throw Error(`FATAL: Could not find document`);
            return LocationMapper.fromEntity(location);
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async findAll(paginationDto: LocationPaginationDto): Promise<FindAllResponse>{
        const {offset, limit} = paginationDto;
        try {
            const [locationData, total] = await Promise.all([
                locationModel.find({}).skip(offset).limit(limit),
                locationModel.find({}).countDocuments()
            ]);
            return {
                offset,
                limit,
                page: (offset <= 0) ? 1 : Math.ceil(offset / limit),
                total,
                locationData: locationData.map(data => LocationMapper.fromEntity(data))
            };
        } catch (error) {
            throw new Error(`FATAL: ${error}`);
        }
    }
}
