import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Item } from "src/items/item.entity";
import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    avatar: string;

    @OneToMany(() => Item, (item) => item.user)
    items: Item[]

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;
}
