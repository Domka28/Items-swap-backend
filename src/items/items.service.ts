import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Item } from "./item.entity";
import { Repository } from "typeorm";


// let products = [
//     { id: 1, title: "Mleko", price: 3.5 },
//     { id: 2, title: "Mąka", price: 2.9 },
// ]

// {
//     "id": 11,
//     "title": "Fjallraven - plecak na laptopa",
//     "description": "Plecak w idealnym stanie. Pomieści laptopa i inne rzeczy potrzebne do pracy lub na uczelnię.",
//     "category": "male-clothing",
//     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//     "userId": 5
// }

@Injectable()
export class ItemsService {
    constructor(@InjectRepository(Item) private repo: Repository<Item>) { }
    getAll() {
        return this.repo.find();
    }

    getById(id: number) {
        return this.repo.findOne({ where: { id } });
    }

    add(title: string, description: string, category: string, image: string, userId: number) {

        const newItem = this.repo.create({ title, description, category, image, userId })
        return this.repo.save(newItem);
    }

    async remove(id: number) {
        const item = await this.repo.findOne({ where: { id } });
        this.repo.remove(item);
    }
    async edit(id: number, title: string, description: string, category: string, image: string) {
        const item = await this.repo.findOne({ where: { id } });
        item.title = title;
        item.description = description;
        item.category = category;
        item.image = image;
        return this.repo.save(item)
    }
}