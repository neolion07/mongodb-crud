export class CreateLogDto{
    constructor(
        public date: string,
        public weather: string,
        public location: string
    ){}

    static create(object:{[key:string]:any}):[string?,CreateLogDto?]{
        const {
       		date,
            weather,
            location
        } = object;
        if (!date)
       	    return ['Please provide the required properties.', undefined];
        return [undefined, new CreateLogDto(
            date,
            weather,
            location
        )];
    }
}
