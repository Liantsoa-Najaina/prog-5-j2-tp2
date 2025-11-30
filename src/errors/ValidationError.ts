import {AppError} from "./AppError";

export class ValidationError extends AppError {
    public readonly statusCode: number = 422;
    public readonly isOperational: boolean = true;

    constructor(message: string) {
        super(`Validation failed : ${message}`);
    }
}
