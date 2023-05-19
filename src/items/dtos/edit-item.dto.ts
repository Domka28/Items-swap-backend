import { IsString, IsOptional } from "class-validator";

export class EditItemDto {
    @IsString({})
    @IsOptional()
    title: string;
    @IsString({})
    @IsOptional()
    description: string;
    @IsString({})
    @IsOptional()
    category: string;
    @IsString({})
    @IsOptional()
    image: string;
}

