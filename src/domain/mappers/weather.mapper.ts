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
        if (!precipitationType) throw Error('prec type required');
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
