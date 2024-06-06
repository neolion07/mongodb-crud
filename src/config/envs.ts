import 'dotenv/config';
import { get } from 'env-var';
export const envs = {
    PORT:get('PORT').required().asPortNumber(),
    MONGO_USER:get('MONGO_USER').required().asString(),
    MONGO_PASSWORD:get('REDIS_PASSWORD').required().asString(),
    MONGO_URL:get('REDIS_HOST').required().asString(),
    MONGO_DB_NAME:get('REDIS_DB_NAME').required().asString()
}