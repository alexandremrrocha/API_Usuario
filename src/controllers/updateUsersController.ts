import { Request, Response } from "express";
import { updateUsersService } from "../database/services/usersService";

export class updateUsersController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { name, email, password } = request.body;

        const service = new updateUsersService();

        const result = await service.execute({ id, name, email, password });

        if (result instanceof Error) {
            return response.status(404).json(result.message);
        }

        return response.json(result);
    }
}