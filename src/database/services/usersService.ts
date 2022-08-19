import { getRepository } from "typeorm";
import { userEntity } from "../entities/userEntity";
import crypto from "crypto-js";
import type { UserRequest } from "../../types/UserRequest";
import type { userUpdateRequest } from "../../types/userUpdateRequest";

export class createUserService {
    async execute({ name, email, password }: UserRequest): Promise<userEntity | Error> {
        let user;
        const repo = getRepository(userEntity)
        const valEmail = await function validateEmail() {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                return (true)
            } else {
                return (false)
            }
        }

        if (name != null && email != null && password != null) {
            if (await repo.findOne({ where: { email } })) {
                return new Error("Email já existe")
            }
            if (valEmail() == true) {
                user = repo.create({
                    name,
                    email,
                    password
                })
            } else {
                return new Error("Email invalido")
            }
        } else {
            return new Error("Um ou mais campo(s) possue(m) valor(es) nulo(s)")
        }

        await repo.save(user);

        return user;
    }
}

export class getAllUsersService {
    async execute() {
        const repo = getRepository(userEntity);

        const users = await repo.find({
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                updated_at: true
            }
        });

        return users;
    }
}

export class getUsersService {
    async execute(id: string) {
        const repo = getRepository(userEntity);

        const users = await repo.find({
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                updated_at: true
            },
            where: { id: id as unknown as number }
        });

        return users;
    }
}

export class updateUsersService {
    async execute({ id, name, email, password }: userUpdateRequest) {
        const repo = getRepository(userEntity);
        const users = await repo.findOne({ where: { id: id as unknown as number } });
        const valEmail = await function validateEmail() {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                return (true)
            } else {
                return (false)
            }
        }

        if (!users) {
            return new Error("Usuario não encontrado!");
        }

        users.name = name ? name : users.name;
        users.email = email ? email : users.email;
        users.password = crypto.SHA256(users.password).toString();

        if (name != null && email != null && password != null) {
            if (await repo.findOne({ where: { email } })) {
                return new Error("Email já existe")
            }
            if (valEmail() == true) {
                await repo.save(users);
            } else {
                return new Error("Email invalido")
            }
        } else {
            return new Error("Um ou mais campo(s) possue(m) valor(es) nulo(s)")
        }

        return users;

    }
}

export class deleteUsersService {
    async execute(id: string) {
        const repo = getRepository(userEntity);

        const users = await repo.findOne({ where: { id: id as unknown as number } });

        if (!users) {
            return new Error("Usuario não encontrado!");
        }

        await repo.delete(id);
    }
}