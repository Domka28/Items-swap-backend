import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Item } from "src/items/item.entity";

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

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    rate: number;

    @Column({ nullable: true })
    ratingCount: number;

    @OneToMany(() => Item, (item) => item.user)
    items: Item[]

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;


}
