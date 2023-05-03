import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { Rating } from "./rating.entity";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }
    getAll() {
        return this.repo.find();
    }

    getById(id: number) {
        return this.repo.findOne({ where: { id } });
    }

    add(userName: string, avatar: string, description: string, rating: Rating) {

        const newUser = this.repo.create({ userName, description, avatar, rating })
        return this.repo.save(newUser);
    }

    async remove(id: number) {
        const user = await this.repo.findOne({ where: { id } });
        this.repo.remove(user);
    }
    async edit(id: number, userName: string, description: string, avatar: string, rating: Rating) {
        const user = await this.repo.findOne({ where: { id } });
        user.userName = userName;
        user.description = description;
        user.avatar = avatar;
        user.rating = rating;
        return this.repo.save(user)
    }
}