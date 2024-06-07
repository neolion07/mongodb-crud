export class UpdateLogDto{
    constructor(
    	public id: string,
        public date: string,
        public weather: string,
        public location: string
    ){}
    static update(object:{[Key:string]:any}):[string?,UpdateLogDto?]{
       const {
       		id,
       		date,
            weather,
            location
       } = object;
       if (!date)
       		return ["Please enter a new date.", undefined];
       return [undefined,new UpdateLogDto(
       	    id,
       	    date,
            weather,
            location
        )];
    }
}
