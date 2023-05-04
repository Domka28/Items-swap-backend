import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Item } from "src/items/item.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    description: string;

    @Column()
    avatar: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    rate: number;

    @Column()
    ratingCount: number;

    @OneToMany(() => Item, (item) => item.user)
    items: Item[]


}
