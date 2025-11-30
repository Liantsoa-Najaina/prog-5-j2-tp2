import {BaseController} from "./BaseController";
import {RentService} from "../services/RentService";
import {Response, Request, NextFunction} from "express";

export class RentController extends BaseController {
    private rentService: RentService;

    constructor(rentService: RentService) {
        super();
        this.rentService = rentService;
    }

    createNewRent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            this.validateRequiredFields(["renterId", "rentableId", "startDate", "endDate"], req.body);

            const rentData = {
                ...req.body,
                startDate: new Date(req.body.startDate),
                endDate: new Date(req.body.endDate),
            };

            const rent = await this.rentService.createRent(rentData);
            res.status(201).json({
                success: true,
                data: rent,
            });
        } catch (error) {
            next(error);
        }
    };

    getARentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const rent = await this.rentService.getRentById(req.params.id);
            res.json({
                success: true,
                data: rent,
            });
        } catch (error) {
            next(error);
        }
    };

    getListOfRentsByRenter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const rents = await this.rentService.getRentsByRenter(req.params.renterId);
            res.json({
                success: true,
                data: rents,
            });
        } catch (error) {
            next(error);
        }
    };

    cancelARent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const rent = await this.rentService.cancelRent(req.params.id);
            res.json({
                success: true,
                data: rent,
            });
        } catch (error) {
            next(error);
        }
    };

    completeARent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const rent = await this.rentService.completeRent(req.params.id);
            res.json({
                success: true,
                data: rent,
            });
        } catch (error) {
            next(error);
        }
    };
}
