import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    category: string;

    @Column()
    image: string;

    @Column()
    userId: number;

    @Column({ default: false })
    isArchived: boolean;

    @ManyToOne(() => User, (user) => user.items)
    user: User
}