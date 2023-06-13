import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/users/user.entity";
import { Item } from "src/items/item.entity";
import { Status } from "./status";

@Entity()
export class Swap {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Item)
    @JoinColumn({ name: 'offerdItemId' })
    offerdItem: Item;

    @ManyToOne(() => Item)
    @JoinColumn({ name: 'requestedItemId' })
    requestedItem: Item;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'swapRecipientId' })
    swapRecipient: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'swapAuthorId' })
    swapAuthor: User;

    @CreateDateColumn()
    creationDate: Date;

    @Column()
    status: Status
}

