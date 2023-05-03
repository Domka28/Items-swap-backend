import { IsObject, IsString } from "class-validator";
import { Rating } from "./rating";

export class CreateUserDto {
    @IsString()
    userName: string;
    @IsString()
    avatar: string;
    @IsString()
    description: string;
    @IsObject()
    rating: Rating;
}
