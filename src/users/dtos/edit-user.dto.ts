import { IsString, IsOptional } from "class-validator";

export class EditUserDto {
    @IsString({})
    @IsOptional()
    avatar: string;
    @IsString({})
    @IsOptional()
    description: string;

}

