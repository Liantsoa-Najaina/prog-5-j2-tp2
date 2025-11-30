import {BaseController} from "./BaseController";
import {RenterService} from "../services/RenterService";
import {Response, Request, NextFunction} from "express";

export class RenterController extends BaseController {
    private renterService: RenterService;

    constructor(renterService: RenterService) {
        super();
        this.renterService = renterService;
    }

    createARenter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            this.validateRequiredFields(["name", "email", "phone"], req.body);

            const renter = await this.renterService.createRenter(req.body);
            res.status(201).json({
                success: true,
                data: renter,
            });
        } catch (error) {
            next(error);
        }
    };

    getRenter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const renter = await this.renterService.getById(req.params.id);
            res.json({
                success: true,
                data: renter,
            });
        } catch (error) {
            next(error);
        }
    };

    getAllRenters = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const renters = await this.renterService.getAll();
            res.json({
                success: true,
                data: renters,
            });
        } catch (error) {
            next(error);
        }
    };

    getListOfRentersByType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {type} = req.params;
            const renters = await this.renterService.getRentersByType(type);
            res.json({
                success: true,
                data: renters,
            });
        } catch (error) {
            next(error);
        }
    };

    updateRenter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const renter = await this.renterService.update(req.params.id, req.body);
            res.json({
                success: true,
                data: renter,
            });
        } catch (error) {
            next(error);
        }
    };

    deleteRenter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.renterService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
