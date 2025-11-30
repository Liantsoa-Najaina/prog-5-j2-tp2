import {IRentRepository} from "../interfaces/IRentRepository";
import {RenterService} from "./RenterService";
import {RentableService} from "./RentableService";
import {Rent, RentStatus} from "../entities/Rent";
import {logger} from "../config/logger";
import {ValidationError} from "../errors/ValidationError";
import {ClientError} from "../errors/ClientError";
import {NotFoundError} from "../errors/NotFoundError";

export class RentService {
    private rentRepository: IRentRepository;
    private renterService: RenterService;
    private rentableService: RentableService;

    constructor(rentRepository: IRentRepository, renterService: RenterService, rentableService: RentableService) {
        this.rentRepository = rentRepository;
        this.renterService = renterService;
        this.rentableService = rentableService;
    }

    async createRent(data: {
        renterId: string;
        rentableId: string;
        startDate: Date;
        endDate: Date;
        notes?: string;
    }): Promise<Rent> {
        logger.info("Creating a new rent", data);

        if (data.startDate >= data.endDate) {
            throw new ValidationError("End date must be after start date");
        }

        if (data.startDate < new Date()) {
            throw new ValidationError("Start date cannot be in the past");
        }

        const renter = await this.renterService.getById(data.renterId);

        const rentable = await this.rentableService.getById(data.rentableId);

        if (!rentable.available) {
            throw new ClientError("Rentable is not available");
        }

        const days = Math.ceil((data.endDate.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24));
        const totalAmount = days * rentable.pricePerDay;

        const rentData = {
            ...data,
            totalAmount,
            status: RentStatus.PENDING,
        };

        const rent = await this.rentRepository.create(rentData);

        await this.rentableService.updateAvailability(data.rentableId, false);

        logger.info("Rent created successfully.", {id: rent.id});

        return rent;
    }

    async getRentById(id: string): Promise<Rent> {
        const rent = await this.rentRepository.findOne(id);
        if (!rent) {
            throw new NotFoundError(`Rent with id ${id}`);
        }
        return rent;
    }

    async getRentsByRenter(rentId: string): Promise<Rent[]> {
        return await this.rentRepository.findByRenter(rentId);
    }

    async getRentsByRentable(rentableId: string): Promise<Rent[]> {
        return await this.rentRepository.findByRentable(rentableId);
    }

    async getActiveRents(): Promise<Rent[]> {
        return await this.rentRepository.findActiveRents();
    }

    async cancelRent(id: string): Promise<Rent> {
        const rent = await this.getRentById(id);

        if (rent.status === RentStatus.CANCELED) {
            throw new ClientError(`Rent with id ${id} is already cancelled`);
        }

        if (rent.status === RentStatus.COMPLETED) {
            throw new ClientError(`Rent with id ${id} is already completed`);
        }

        const cancelledRent = await this.rentRepository.cancelRent(id);

        await this.rentableService.updateAvailability(rent.rentableId, true);

        logger.info("Rent cancelled successfully.", {id: cancelledRent.id});
        return cancelledRent;
    }

    async completeRent(id: string): Promise<Rent> {
        const rent = await this.getRentById(id);
        if (rent.status === RentStatus.COMPLETED) {
            throw new ClientError(`Rent with id ${id} is already completed`);
        }

        const completedRent = await this.rentRepository.update(id, {
            status: RentStatus.COMPLETED,
        } as any);

        await this.rentableService.updateAvailability(rent.rentableId, true);

        logger.info("Rent completed successfully.", {id: completedRent.id});
        return completedRent;
    }
}
