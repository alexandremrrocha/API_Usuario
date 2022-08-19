import { Request, Response } from "express";
import { createUserService } from "../database/services/usersService";

export class createUserController {
    async handle(request, response) {
        const { name, email, password } = request.body
        const service = new createUserService();
        const result = await service.execute({ name, email, password });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(201).json(result);
    }
}