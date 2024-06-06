import mongoose from "mongoose"

export class IdValidator{
    static isValidMongoId(id:string){
        return mongoose.Types.ObjectId.isValid(id);
    }
}