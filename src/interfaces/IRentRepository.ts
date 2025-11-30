import {IRepository} from "./IRepository";
import {Rent} from "../entities/Rent";

export interface IRentRepository extends IRepository<Rent> {
    findByRenter(renterId: string): Promise<Rent[]>;

    findByRentable(rentableId: string): Promise<Rent[]>;

    findActiveRents(): Promise<Rent[]>;

    cancelRent(id: string): Promise<Rent>;
}
