import { IsString } from "class-validator";

export class EditUserDto {
    @IsString({})
    avatar: string;
    @IsString({})
    description: string;

}

