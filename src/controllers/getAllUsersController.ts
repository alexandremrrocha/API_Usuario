import { Request, Response } from "express";
import { getAllUsersService } from "../database/services/usersService";

export class getAllUsersController {
    async handle(request: Request, response: Response) {
        const service = new getAllUsersService

        const users = await service.execute();
        return response.json(users);
    }
}