import {IRepository} from "./IRepository";
import {Rentable} from "../entities/Rentable";

export interface IRentableRepository extends IRepository<Rentable> {
    findByType(type: string): Promise<Rentable[]>;

    findAvailable(): Promise<Rentable[]>;

    updateAvailability(id: string, available: boolean): Promise<Rentable>;
}
