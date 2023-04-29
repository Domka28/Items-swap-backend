import { IsString } from "class-validator";

export class EditItemDto {
    @IsString({})
    title: string;
    description: string;
    category: string;
    image: string;
}