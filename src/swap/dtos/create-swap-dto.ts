import { IsNumber } from "class-validator";

export class CreateSwapDto {
    @IsNumber()
    offeredItemId: number;
    @IsNumber()
    requestedItemId: number;
    @IsNumber()
    swapRecipientId: number;
    @IsNumber()
    swapAuthorId: number;
}

