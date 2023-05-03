import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Rating } from "./rating.entity";

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

    // @Column()
    // rating: Rating;


}
