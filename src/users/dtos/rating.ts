import { IsNumber } from "class-validator";

export class Rating {
    @IsNumber()
    rate: number;
    @IsNumber()
    count: number;
}