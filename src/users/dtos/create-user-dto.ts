import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    userName: string;
    @IsString()
    avatar: string;
    @IsString()
    description: string;
    // @IsObject()
    // rating: Rating;


}
