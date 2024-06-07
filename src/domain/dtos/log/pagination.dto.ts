export class LogPaginationDto{

    constructor(
        public offset: number,
        public limit: number,
    ){}

    static create( object: {[key:string]:any} ): [string?, LogPaginationDto?]{
        const { offset = 0, limit = 10 } = object;

        if( isNaN( +offset ) ) return ['Offset must be a number'];
        if( +offset < 0  ) return ['Offset must be a positive number'];
        if( isNaN( +limit ) ) return ['Limit must be a number'];
        if( +limit <= 0  ) return ['Limit must be a positive number'];

        return [undefined, new LogPaginationDto(+offset, +limit)];
    }
}