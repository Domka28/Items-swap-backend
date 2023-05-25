import { IsString } from "class-validator";

export class EditSwapDto {
    @IsString({})
    status: string;
}

