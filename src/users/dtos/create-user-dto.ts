import { IsDecimal, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    userName: string;
    @IsString()
    avatar: string;
    @IsString()
    description: string;
    @IsDecimal()
    rate: number;
    @IsNumber()
    ratingCount: number;
}
