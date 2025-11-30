import {BaseService} from "./BaseService";
import {Rentable} from "../entities/Rentable";
import {IRentableRepository} from "../interfaces/IRentableRepository";
import {logger} from "../config/logger";
import {ClientError} from "../errors/ClientError";

export class RentableService extends BaseService<Rentable> {
    private rentableRepository: IRentableRepository;

    constructor(rentableRepository: IRentableRepository) {
        super(rentableRepository);
        this.rentableRepository = rentableRepository;
    }

    async createRentable(data: Partial<Rentable>): Promise<Rentable> {
        logger.info("Creating a new rentable", {name: data.name});
        if (data.pricePerDay! <= 0) {
            throw new ClientError("Price per day must be greater than 0");
        }

        const rentable = await this.rentableRepository.create(data);
        logger.info("Rentable created successfully", {id: rentable.id});

        return rentable;
    }

    async getAvailableRentables(): Promise<Rentable[]> {
        return await this.rentableRepository.findAvailable();
    }

    async getRentablesByType(type: string): Promise<Rentable[]> {
        return await this.rentableRepository.findByType(type);
    }

    async updateAvailability(
        id: string,
        available: boolean
    ): Promise<Rentable> {
        logger.info("Updating a rentable availability", {id: id, available});
        return await this.rentableRepository.updateAvailability(id, available);
    }
}
