export class UpdateLocationDto{
    constructor(
    	public id: string,
        public city: string,
        public state: string
    ){}
    static update(object:{[Key:string]:any}):[string?,UpdateLocationDto?]{
       const {
       		id,
       		city,
            state
       } = object;
       if (!city)
       		return ["Please enter a new city.", undefined];
       return [undefined,new UpdateLocationDto(
       	    id,
       	    city,
            state
        )];
    }
}
