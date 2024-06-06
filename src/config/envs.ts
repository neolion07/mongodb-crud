import 'dotenv/config';
import { get } from 'env-var';
export const envs = {
    PORT:get('PORT').required().asPortNumber(),
    MONGO_USER:get('MONGO_USER').required().asString(),
    MONGO_PASSWORD:get('MONGO_PASSWORD').required().asString(),
    MONGO_URL:get('MONGO_URL').required().asString(),
    MONGO_DB_NAME:get('MONGO_DB_NAME').required().asString()
}
