import {BaseService} from "./BaseService";
import {Renter} from "../entities/Renter";
import {IRenterRepository} from "../interfaces/IRenterRepository";
import {logger} from "../config/logger";
import {ClientError} from "../errors/ClientError";

export class RenterService extends BaseService<Renter> {
    private renterRepository: IRenterRepository;

    constructor(renterRepository: IRenterRepository) {
        super(renterRepository);
        this.renterRepository = renterRepository;
    }

    async createRenter(data: Partial<Renter>): Promise<Renter> {
        logger.info("Creating a new Renter", {email: data.email});

        const existingRenter = await this.renterRepository.findByEmail(data.email!);
        if (existingRenter) {
            throw new ClientError("Renter with this email already exists");
        }

        const newRenter = await this.renterRepository.create(data);
        logger.info("Renter created successfully", {id: newRenter.id});
        return newRenter;
    }

    async getRentersByType(type: string): Promise<Renter[]> {
        return await this.renterRepository.findByType(type);
    }

    async getRenterByEmail(email: string): Promise<Renter | null> {
        return await this.renterRepository.findByEmail(email);
    }
}
