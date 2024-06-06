export class WeatherEntity{
    constructor(
        public id: string,
        public date: string,
        public temperatureInCelsius: number,
        public sky: string,
        public windSpeed: number,
        public windDirection: string
    ){}
}