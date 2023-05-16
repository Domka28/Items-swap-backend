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

    getByUserName(userName: string) {
        return this.repo.findOne({
            where: { userName }, relations: {
                items: true
            }
        });
    }
    add(userName: string, avatar: string, description: string, rate: number, ratingCount: number) {
        const newUser = this.repo.create({ userName, avatar, description, rate, ratingCount })
        return this.repo.save(newUser);
    }

    async remove(id: number) {
        const user = await this.repo.findOne({ where: { id } });
        this.repo.remove(user);
    }
    async edit(id: number, avatar: string, description: string) {
        const user = await this.repo.findOne({ where: { id } });
        user.avatar = avatar;
        user.description = description;
        return this.repo.save(user)
    }
}