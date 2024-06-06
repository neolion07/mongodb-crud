export class UpdateWeatherDto{
    constructor(
    	public id: string,
        public precipitationType: string,
        public temperatureInCelsius?: number,
        public sky?: string,
        public windSpeedInKmh?: number,
        public windDirection?: string
    ){}
    static update(object:{[Key:string]:any}):[string?,UpdateWeatherDto?]{
       const {
       		id,
       		precipitationType,
       		temperatureInCelsius,
       		sky,
       		windSpeedInKmh,
       		windDirection
       } = object;
       if (!precipitationType)
       		return ["Please enter a new precipitation type.", undefined];
       return [undefined,new UpdateWeatherDto(
       	id,
       	precipitationType,
        temperatureInCelsius,
        sky,
        windSpeedInKmh,
        windDirection
       )];
    }
}
