import {AppError} from "./AppError";

export class ServerError extends AppError {
    public readonly statusCode: number = 500;
    public readonly isOperational: boolean = false;

    constructor(message: string = "Internal Server Error") {
        super(message);
    }
}
