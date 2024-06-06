export class UpdateWeatherDto{
    constructor(
        public date: string,
        public temperatureInCelsius: number,
        public sky?: string,
        public windSpeed?: number,
        public windDirection?: string
    ){}
    static update(object:{[Key:string]:any}):[string?,UpdateWeatherDto?]{
       const {date, temperatureInCelsius, sky, windSpeed, windDirection} = object;
       if (!date) return ["Please enter date and temperature.", undefined];
       return [undefined,new UpdateWeatherDto(
        date,
        temperatureInCelsius,
        sky,
        windSpeed,
        windDirection
       )] 
    }
}