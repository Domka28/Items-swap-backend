import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Item } from "./item.entity";
import { Repository } from "typeorm";

@Injectable()
export class ItemsService {
    constructor(@InjectRepository(Item) private repo: Repository<Item>) { }
    getAll() {
        return this.repo.find({
            relations: {
                user: true
            },
            where: {
                isArchived: false
            }
        });
    }

    getById(id: number) {
        return this.repo.findOne({
            where: { id },
            relations: {
                user: true
            }
        });
    }

    getByUserId(userId: number) {
        return this.repo.find({
            where: { userId },
            relations: {
                user: true
            }
        });
    }


    add(title: string, description: string, category: string, image: string, userId: number) {

        const newItem = this.repo.create({ title, description, category, image, userId })
        return this.repo.save(newItem);
    }

    async remove(id: number) {
        const item = await this.repo.findOne({ where: { id } });
        this.repo.remove(item);
    }
    async edit(id: number, title: string, description: string, image: string) {
        const item = await this.repo.findOne({ where: { id } });
        item.title = title;
        item.description = description;
        item.image = image;
        return this.repo.save(item)
    }
}