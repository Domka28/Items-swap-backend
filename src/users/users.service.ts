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
        return this.repo.findOne({
            where: { id }, relations: {
                items: true
            }
        });
    }

    add(userName: string, avatar: string, description: string, rate: number, ratingCount: number) {
        const newUser = this.repo.create({ userName, description, avatar, rate, ratingCount })
        return this.repo.save(newUser);
    }

    async remove(id: number) {
        const user = await this.repo.findOne({ where: { id } });
        this.repo.remove(user);
    }
    async edit(id: number, userName: string, description: string, avatar: string, rate: number, ratingCount: number) {
        const user = await this.repo.findOne({ where: { id } });
        user.userName = userName;
        user.description = description;
        user.avatar = avatar;
        user.rate = rate;
        user.ratingCount = ratingCount;
        return this.repo.save(user)
    }
}