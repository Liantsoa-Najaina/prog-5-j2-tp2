export abstract class AppError extends Error {
    public abstract readonly statusCode: number;
    public abstract readonly isOperational: boolean;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
