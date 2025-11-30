import {BaseRepository} from "./BaseRepository";
import {Rentable} from "../entities/Rentable";
import {IRentableRepository} from "../interfaces/IRentableRepository";

export class RentableRepository extends BaseRepository<Rentable> implements IRentableRepository {
    constructor() {
        super(Rentable);
    }

    async findByType(type: string): Promise<Rentable[]> {
        return await this.repository.find({where: {type} as any});
    }

    async findAvailable(): Promise<Rentable[]> {
        return await this.repository.find({where: {available: true} as any});
    }

    async updateAvailability(id: string, available: boolean): Promise<Rentable> {
        return await this.update(id, {available} as any);
    }
}
