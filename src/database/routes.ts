import { Router } from "express";
import { createUserController } from "../controllers/createUsersController";
import { deleteUsersController } from "../controllers/deleteUsersController";
import { getAllUsersController } from "../controllers/getAllUsersController";
import { getUsersController } from "../controllers/getUsersController";
import { updateUsersController } from "../controllers/updateUsersController";

const routes = Router();

routes.post("/users", new createUserController().handle);
routes.get("/users", new getAllUsersController().handle);
routes.get("/users/:id", new getUsersController().handle);
routes.delete("/users/:id", new deleteUsersController().handle);
routes.patch("/users/:id", new updateUsersController().handle);

export { routes };