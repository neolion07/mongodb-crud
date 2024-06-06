import mongoose from "mongoose";
import { envs } from "../../config/envs";
export class MongoDBClient{
    static async connection(){
        try {
            await mongoose.connect(envs.MONGO_URL,{dbName:envs.MONGO_DB_NAME});
            console.log(`MongoDB connection established (database: ${envs.MONGO_DB_NAME})`);
            return true;
        }
        catch (error){
            throw Error(`MongoDB connection failed: ${error}`);
        }
    }
}