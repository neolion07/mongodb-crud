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
        const { date } = createWeatherDto;
        try {
            const exist = await weatherModel.findOne({ date });
            if (exist) throw Error(`This entry already exists!`);

            const temperatureInCelsius = await weatherModel.create(createWeatherDto);
            if (!temperatureInCelsius) throw Error(`FATAL: Could not create entry`);

            await temperatureInCelsius.save();
            return WeatherMapper.fromEntity(temperatureInCelsius);
        } catch (error) {
            throw new Error(`FATAL: ${error}`);
        }
    }

    async update(
        updateWeatherDto: UpdateWeatherDto, 
        id: string
    ): Promise<WeatherEntity> {
        try {
            const date = await weatherModel.findByIdAndUpdate({
                _id: id,
                data: {...updateWeatherDto}
            });
            if (!date) throw Error(`FATAL: Could not update entry`);

            await date.save();
            return WeatherMapper.fromEntity(date);
        } catch (error) {
            throw new Error(`FATAL: ${error}`);
        }
    }

    async delete(id: string): Promise<WeatherEntity>{
        try {
            const date = await weatherModel.findOneAndDelete(
                {_id: id}
            );
            if (!date) throw Error(`FATAL: Could not delete entry`)
            return WeatherMapper.fromEntity(date);
        } catch (error) {
            throw new Error(`FATAL: ${error}`);
        }
    }

    async findOne(id: string): Promise<WeatherEntity>{
        try {
            const date = await weatherModel.findById(
                {_id: id}
            );
            if (!date) throw Error(`FATAL: Could not find entry`);
            return WeatherMapper.fromEntity(date);
        } catch (error) {
            throw new Error(`FATAL: ${error}`);
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