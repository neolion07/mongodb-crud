export class CreateWeatherDto{
    constructor(
        public date: string,
        public temperatureInCelsius: number,
        public sky?: string,
        public windSpeed?: number,
        public windDirection?: string
    ){}

    static create(object:{[Key:string]:any}):[string?,CreateWeatherDto?]{
        const {date, temperatureInCelsius, sky, windSpeed, windDirection} = object;
        if (!date || !temperatureInCelsius)
            return ["Please provide the required properties.", undefined];
        return [undefined, new CreateWeatherDto(
            date,
            temperatureInCelsius,
            sky,
            windSpeed,
            windDirection)];
    }
}