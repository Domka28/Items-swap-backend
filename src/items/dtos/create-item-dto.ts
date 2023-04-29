import { IsNumber, IsString } from "class-validator";

export class CreateItemDto {
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsString()
    category: string;
    @IsString()
    image: string;
    @IsNumber()
    userId: number;
}