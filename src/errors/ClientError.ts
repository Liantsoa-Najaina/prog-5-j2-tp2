import {AppError} from "./AppError";

export class ClientError extends AppError {
    public readonly statusCode: number = 400;
    public readonly isOperational: boolean = true;

    constructor(message: string) {
        super(message);
    }
}
