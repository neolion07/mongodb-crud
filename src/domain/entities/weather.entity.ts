export class WeatherEntity{
    constructor(
        public id: string,
        public precipitationType: string,
        public temperatureInCelsius: number,
        public sky: string,
        public windSpeedInKmh: number,
        public windDirection: string
    ){}
}
