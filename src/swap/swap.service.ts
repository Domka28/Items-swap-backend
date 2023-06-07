import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Swap } from "./swap.entity";
import { Item } from "src/items/item.entity";
import { User } from "src/users/user.entity";
import { Status } from "./status";

@Injectable()
export class SwapService {
    constructor(@InjectRepository(Swap) private repo: Repository<Swap>,
        @InjectRepository(User) private repoUser: Repository<User>,
        @InjectRepository(Item) private repoItem: Repository<Item>) { }

    getAllSwap() {
        return this.repo.find({});
    }

    getAllByAuthorId(authorId: number) {
        return this.repo.find({
            where: [{ swapAuthor: { id: authorId } }, { swapRecipient: { id: authorId } }],
            relations: {
                offerdItem: true,
                requestedItem: true,
                swapRecipient: true,
                swapAuthor: true
            },
            order: {
                creationDate: 'DESC'
            }
        });
    }

    async completeBySwapId(swapId: number) {
        const swap = await this.repo.findOne({
            where: { id: swapId }
        });
        swap.status = Status.Completed
        return this.repo.save(swap)
    }

    async rejectBySwapId(swapId: number) {
        const swap = await this.repo.findOne({
            where: { id: swapId }, relations: {
                offerdItem: true,
                requestedItem: true,
            }
        })
        const requestedItem = await this.repoItem.findOne({ where: { id: swap.requestedItem.id } })
        const offeredItem = await this.repoItem.findOne({ where: { id: swap.offerdItem.id } })
        swap.status = Status.Rejected
        requestedItem.isArchived = false
        offeredItem.isArchived = false
        this.repoItem.save(requestedItem)
        this.repoItem.save(offeredItem)
        return this.repo.save(swap)
    }

    async add(offeredItemId: number, requestedItemId: number, swapRecipientId: number, swapAuthorId: number) {
        const swapAuthor = await this.repoUser.findOne({ where: { id: swapAuthorId } });
        const swapRecipient = await this.repoUser.findOne({ where: { id: swapRecipientId } });
        const requestedItem = await this.repoItem.findOne({ where: { id: requestedItemId } });
        const offeredItem = await this.repoItem.findOne({ where: { id: offeredItemId } });

        const swap = new Swap()
        swap.offerdItem = offeredItem
        swap.requestedItem = requestedItem
        swap.swapRecipient = swapRecipient
        swap.swapAuthor = swapAuthor
        swap.status = Status.Created
        requestedItem.isArchived = true
        offeredItem.isArchived = true
        this.repoItem.save(requestedItem)
        this.repoItem.save(offeredItem)
        const newSwap = this.repo.save(swap)
        return newSwap;
    }

    async remove(id: number) {
        const swap = await this.repo.findOne({ where: { id } });
        const requestedItem = await this.repoItem.findOne({ where: { id: swap.requestedItem.id } })
        const offeredItem = await this.repoItem.findOne({ where: { id: swap.offerdItem.id } })
        requestedItem.isArchived = false
        offeredItem.isArchived = false
        this.repoItem.save(requestedItem)
        this.repoItem.save(offeredItem)
        this.repo.remove(swap);
    }
}