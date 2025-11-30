import {DataSource} from "typeorm";
import {Renter} from "../entities/Renter";
import {Rentable} from "../entities/Rentable";
import {Rent} from "../entities/Rent";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || "5432"),
    username: process.env.DATABASE_USERNAME || "postgres",
    password: process.env.DATABASE_PASSWORD || "postgres",
    database: process.env.DATABASE_NAME || "rentall_app",
    entities: [Renter, Rentable, Rent],
    synchronize: process.env.NODE_ENV !== "production",
    logging: process.env.NODE_ENV === "development",
});
