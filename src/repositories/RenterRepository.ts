import {BaseRepository} from "./BaseRepository";
import {Renter} from "../entities/Renter";
import {IRenterRepository} from "../interfaces/IRenterRepository";

export class RenterRepository
    extends BaseRepository<Renter>
    implements IRenterRepository
{
    constructor() {
        super(Renter);
    }

    async findByType(type: string): Promise<Renter[]> {
        return await this.repository.find({where: {type} as any});
    }

    async findByEmail(email: string): Promise<Renter | null> {
        return await this.repository.findOne({where: {email} as any});
    }
}
