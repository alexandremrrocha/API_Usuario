import { Request, Response } from "express";
import { deleteUsersService } from "../database/services/usersService";

export class deleteUsersController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const service = new deleteUsersService();

        const result = await service.execute(id);

        if (result instanceof Error) {
            return response.status(404).json(result.message)
        }

        return response.status(200).end();
    }
}