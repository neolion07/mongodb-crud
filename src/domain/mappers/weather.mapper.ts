import { WeatherEntity } from "../entities/weather.entity"
export class WeatherMapper{
static fromEntity(object:{[key:string]:any}): WeatherEntity{

        const {
            id,
            date,
            temperatureInCelsius,
            sky,
            windSpeed,
            windDirection
        } = object;
        if (!date || !temperatureInCelsius)
            throw new Error(`Missing date and temperature.`);
        return new WeatherEntity(
            id,
            date,
            temperatureInCelsius,
            sky,
            windSpeed,
            windDirection
        );
    }
}