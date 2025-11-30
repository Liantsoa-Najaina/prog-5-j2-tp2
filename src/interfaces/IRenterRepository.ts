import {IRepository} from "./IRepository";
import {Renter} from "../entities/Renter";

export interface IRenterRepository extends IRepository<Renter> {
    findByType(type: string): Promise<Renter[]>;

    findByEmail(email: string): Promise<Renter | null>;
}
