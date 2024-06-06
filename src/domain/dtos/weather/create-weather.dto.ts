export class CreateWeatherDto{
    constructor(
        public precipitationType: string,
        public temperatureInCelsius: number,
        public sky: string,
        public windSpeedInKmh: number,
        public windDirection: string
    ){}

    static create(object:{[key:string]:any}):[string?,CreateWeatherDto?]{
       const {
       		precipitationType,
       		temperatureInCelsius,
       		sky,
       		windSpeedInKmh,
       		windDirection
       } = object;
       if (!precipitationType)
       		return ['Please provide the required properties.', undefined];
       return [undefined, new CreateWeatherDto(
            precipitationType,
            +temperatureInCelsius,
            sky,
            +windSpeedInKmh,
            windDirection)];
    }
}
