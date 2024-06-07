import { WeatherEntity } from "../entities/weather.entity"
export class WeatherMapper{
static fromEntity(object:{[key:string]:any}): WeatherEntity{

        const {
            id,
            precipitationType,
            temperatureInCelsius,
            sky,
            windSpeedInKmh,
            windDirection
        } = object;
        
        return new WeatherEntity(
            id,
            precipitationType,
            temperatureInCelsius,
            sky,
            windSpeedInKmh,
            windDirection,
        );
    }
}
