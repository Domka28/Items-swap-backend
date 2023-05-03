import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }
    getAll() {
        return this.repo.find();
    }

    getById(id: number) {
        return this.repo.findOne({ where: { id } });
    }

    add(userName: string, avatar: string, description: string) {

        const newUser = this.repo.create({ userName, description, avatar })
        return this.repo.save(newUser);
    }

    async remove(id: number) {
        const user = await this.repo.findOne({ where: { id } });
        this.repo.remove(user);
    }
    async edit(id: number, userName: string, description: string, avatar: string) {
        const user = await this.repo.findOne({ where: { id } });
        user.userName = userName;
        user.description = description;
        user.avatar = avatar;
        return this.repo.save(user)
    }
}