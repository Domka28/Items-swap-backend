import { Body, Controller, Get, Param, Post, Delete, HttpCode, Put } from "@nestjs/common";
import { SwapService } from "./swap.service";
import { CreateSwapDto } from "./dtos/create-swap-dto";

@Controller('swap')
export class SwapController {
    private swapService;
    constructor(swapService: SwapService) {
        this.swapService = swapService;
    }

    @Get()
    getAllSwap() {
        return this.swapService.getAllSwap()
    }

    @Post()
    createSwap(@Body() body: CreateSwapDto) {
        return this.swapService.add(body.offeredItemId, body.requestedItemId, body.swapRecipientId, body.swapAuthorId)
    }

    @Get('/author/:authorId')
    getAllByAuthorId(@Param('authorId') authorId: "string") {
        return this.swapService.getAllByAuthorId(parseInt(authorId))
    }
}

