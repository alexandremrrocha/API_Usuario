import { Request, Response } from "express";
import { getUsersService } from "../database/services/usersService";

export class getUsersController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new getUsersService

        const result = await service.execute(id);

        return response.json(result);
    }
}