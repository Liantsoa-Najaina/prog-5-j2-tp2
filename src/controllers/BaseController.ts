import {Response} from "express";

export abstract class BaseController {
    protected handleError(error: Error, res: Response): void {
        throw error;
    }

    protected validateRequiredFields(fields: string[], data: any): void {
        const missingFields = fields.filter((field) => !data[field]);
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
        }
    }
}
