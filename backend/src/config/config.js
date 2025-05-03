import dotenv from "dotenv";

dotenv.config();

export const config = {
    PORT: process.env.PORT || 8080,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET
}