import {AppError} from "./AppError";

export class NotFoundError extends AppError {
    public readonly statusCode: number = 404;
    public readonly isOperational: boolean = true;

    constructor(resource: string) {
        super(`${resource} not found`);
    }
}
