import { weatherModel } from "../../data/MongoDB/models/weather.model";
import { WeatherEntity } from "../../domain/entities/weather.entity";
import { WeatherMapper } from "../../domain/mappers/weather.mapper";
import { CreateWeatherDto } from "../../domain/dtos/weather/create-weather.dto";
import { UpdateWeatherDto } from "../../domain/dtos/weather/update-weather.dto";
import { WeatherPaginationDto } from "../../domain/dtos/weather/pagination.dto";

interface FindAllResponse{
    offset: number;
    limit:  number;
    total:  number;
    page:   number;
    weatherData:    WeatherEntity[];
}

export class WeatherService{

    async create(createWeatherDto: CreateWeatherDto): Promise<WeatherEntity>{
        try {
            const weather = await weatherModel.create({...createWeatherDto});
            if (!weather) throw Error(`FATAL: Could not create document`);

            await weather.save();
            return WeatherMapper.fromEntity(weather);
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async update(
        updateWeatherDto: UpdateWeatherDto, 
        id: string
    ): Promise<WeatherEntity> {
        try {
            const weather = await weatherModel.findByIdAndUpdate(
            	id,
            	{...updateWeatherDto},
            	{new: true}
            );
            if (!weather) throw Error(`FATAL: Could not find document to update`);
			await weather.save();
            return WeatherMapper.fromEntity(weather);
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async delete(id: string): Promise<WeatherEntity>{
        try {
            const weather = await weatherModel.findOneAndDelete(
                {_id: id}
            );
            if (!weather) throw Error(`FATAL: Could not delete document`)
            return WeatherMapper.fromEntity(weather);
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async findOne(id: string): Promise<WeatherEntity>{
        try {
            const weather = await weatherModel.findById(
                {_id: id}
            );
            if (!weather) throw Error(`FATAL: Could not find document`);
            return WeatherMapper.fromEntity(weather);
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async findAll(paginationDto: WeatherPaginationDto): Promise<FindAllResponse>{
        const {offset, limit} = paginationDto;
        try {
            const [weatherData, total] = await Promise.all([
                weatherModel.find({}).skip(offset).limit(limit),
                weatherModel.find({}).countDocuments()
            ]);
            return {
                offset,
                limit,
                page: (offset <= 0) ? 1 : Math.ceil(offset / limit),
                total,
                weatherData: weatherData.map(data => WeatherMapper.fromEntity(data))
            };
        } catch (error) {
            throw new Error(`FATAL: ${error}`);
        }
    }
}
