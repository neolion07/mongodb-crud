export class CreateLocationDto{
    constructor(
        public city: string,
        public state: string
    ){}

    static create(object:{[key:string]:any}):[string?,CreateLocationDto?]{
       const {
       		city,
            state
       } = object;
       if (!city)
       		return ['Please provide the required properties.', undefined];
       return [undefined, new CreateLocationDto(
            city,
            state
        )];
    }
}
