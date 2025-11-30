import {BaseRepository} from "./BaseRepository";
import {IRentRepository} from "../interfaces/IRentRepository";
import {Rent, RentStatus} from "../entities/Rent";

export class RentRepository extends BaseRepository<Rent> implements IRentRepository {
    constructor() {
        super(Rent);
    }

    async findByRenter(renterId: string): Promise<Rent[]> {
        return await this.repository.find({
            where: {renterId},
            relations: ["rentable"],
        });
    }

    async findByRentable(rentableId: string): Promise<Rent[]> {
        return await this.repository.find({
            where: {rentableId},
            relations: ["renter"],
        });
    }

    async findActiveRents(): Promise<Rent[]> {
        return await this.repository.find({
            where: {status: RentStatus.ACTIVE},
            relations: ["renter", "rentable"],
        });
    }

    async cancelRent(id: string): Promise<Rent> {
        return await this.update(id, {status: RentStatus.CANCELED} as any);
    }
}
