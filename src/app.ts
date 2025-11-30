import express from "express";
import {AppDataSource} from "./config/database";
import {logger} from "./config/logger";
import {RenterRepository} from "./repositories/RenterRepository";
import {RentableRepository} from "./repositories/RentableRepository";
import {RentRepository} from "./repositories/RentRepository";
import {RenterService} from "./services/RenterService";
import {RentableService} from "./services/RentableService";
import {RentService} from "./services/RentService";
import {RenterController} from "./controllers/RenterController";
import {RentableController} from "./controllers/RentableController";
import {RentController} from "./controllers/RentController";
import {errorHandler} from "./middlewares/errorHandler";

export class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.initializeDatabase();
        this.initializeMiddlewares();
        this.initializeDependencies();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private async initializeDatabase(): Promise<void> {
        try {
            await AppDataSource.initialize();
            logger.info("Database connection established");
        } catch (error) {
            logger.error("Database connection failed:", error);
            process.exit(1);
        }
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    private initializeDependencies(): void {
        const renterRepository = new RenterRepository();
        const rentableRepository = new RentableRepository();
        const rentRepository = new RentRepository();

        const renterService = new RenterService(renterRepository);
        const rentableService = new RentableService(rentableRepository);
        const rentService = new RentService(rentRepository, renterService, rentableService);

        const renterController = new RenterController(renterService);
        const rentableController = new RentableController(rentableService);
        const rentController = new RentController(rentService);

        this.app.locals.renterController = renterController;
        this.app.locals.rentableController = rentableController;
        this.app.locals.rentController = rentController;
    }

    private initializeRoutes(): void {
        const {renterController, rentableController, rentController} = this.app.locals;

        // Renter routes
        this.app.post("/api/renters", renterController.createARenter);
        this.app.get("/api/renters", renterController.getAllRenters);
        this.app.get("/api/renter/id", renterController.getRenter);
        this.app.get("/api/renters/type/:type", renterController.getListOfRentersByType);
        this.app.put("/api/renters/:id", renterController.updateRenter);
        this.app.delete("/api/renters/:id", renterController.deleteRenter);

        // Rentables routes
        this.app.post("/api/rentables", rentableController.createARentable);
        this.app.get("/api/rentables", rentableController.getListOfAllRentables);
        this.app.get("/api/rentables/available", renterController.getListOfAvailableRentables);
        this.app.get("/api/rentables/:id", rentableController.getARentable);
        this.app.get("/api/rentables/type/:type", rentableController.getListOfRentablesByType);
        this.app.put("/api/rentables/:id", rentableController.updateRentableAvailability);
        this.app.delete("/api/rentables/:id", rentableController.deleteRentable);

        // Rent routes
        this.app.post("/api/rents", renterController.createNewRent);
        this.app.get("/api/rent/:id", rentController.getARentById);
        this.app.get("/api/rents/renter/:renterId", renterController.getListOfRentsByRenter);
        this.app.post("/api/rent/:id/cancel", renterController.cancelARent);
        this.app.post("/api/rent/:id/complete", renterController.completeARent);
    }

    private initializeErrorHandling(): void {
        this.app.use(errorHandler);
    }

    public listen(port: number): void {
        this.app.listen(port, () => {
            logger.info("Server running on port " + port);
        });
    }
}
