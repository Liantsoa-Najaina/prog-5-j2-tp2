import {Request, Response, NextFunction} from "express";
import {AppError} from "../errors/AppError";
import {logger} from "../config/logger";

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error("An error occurred:", {
        message: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
    });

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            error: {
                message: error.message,
                operational: error.isOperational,
            },
        });
    }

    return res.status(500).json({
        success: false,
        error: {
            message: "Internal Server Error",
            operational: false,
        },
    });
};
