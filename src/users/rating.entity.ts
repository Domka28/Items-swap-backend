import { Column } from "typeorm";

export class Rating {
    @Column()
    rate: number;
    @Column()
    count: number;
}