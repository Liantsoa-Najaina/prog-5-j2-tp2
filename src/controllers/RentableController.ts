import {BaseController} from "./BaseController";
import {RentableService} from "../services/RentableService";
import {NextFunction, Request, Response} from "express";

export class RentableController extends BaseController {
    private rentableService: RentableService;

    constructor(rentableService: RentableService) {
        super();
        this.rentableService = rentableService;
    }

    getARentable = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const rentable = await this.rentableService.getById(req.params.id);
            res.json({
                success: true,
                data: rentable,
            });
        } catch (error) {
            next(error);
        }
    };

    createARentable = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            this.validateRequiredFields(["name", "description", "pricePerDay", "available"], req.body);
            const rentable = await this.rentableService.createRentable(req.body);
            res.status(201).json({
                success: true,
                data: rentable,
            });
        } catch (error) {
            next(error);
        }
    };

    getListOfAvailableRentables = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const rentables = await this.rentableService.getAvailableRentables();
            res.json({
                success: true,
                data: rentables,
            });
        } catch (error) {
            next(error);
        }
    };

    getListOfAllRentables = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const rentables = await this.rentableService.getAll();
            res.json({
                success: true,
                data: rentables,
            });
        } catch (error) {
            next(error);
        }
    };

    getListOfRentablesByType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const rentables = await this.rentableService.getRentablesByType(req.params.type);
            res.json({
                success: true,
                data: rentables,
            });
        } catch (error) {
            next(error);
        }
    };

    updateRentableAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const rentable = await this.rentableService.updateAvailability(req.params.id, req.body);
            res.json({
                success: true,
                data: rentable,
            });
        } catch (error) {
            next(error);
        }
    };

    deleteRentable = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.rentableService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
