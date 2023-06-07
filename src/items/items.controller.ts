import { Body, Controller, Get, Param, Post, Delete, HttpCode, Put } from "@nestjs/common";
import { CreateItemDto } from "./dtos/create-item-dto";
import { ItemsService } from "./items.service";
import { EditItemDto } from "./dtos/edit-item.dto";


@Controller('items')
export class ItemsController {
    private itemsService;
    constructor(itemsService: ItemsService) {
        this.itemsService = itemsService;
    }

    @Get()
    getItems() {
        return this.itemsService.getAll()
    }

    @Get('/:id')
    getItem(@Param('id') id: "string") {
        return this.itemsService.getById(parseInt(id))
    }

    @Post()
    addItem(@Body() body: CreateItemDto) {
        return this.itemsService.add(body.title, body.description, body.category, body.image, body.userId)
    }

    @Delete('/:id')
    @HttpCode(204)
    removeItem(@Param('id') id: string) {
        return this.itemsService.remove(parseInt(id))
    }

    @Put('/:id')
    editItem(@Body() body: EditItemDto, @Param('id') id: string) {
        return this.itemsService.edit(+id, body.title, body.description, body.category, body.image)
    }

    @Get('/user/:userId')
    getItemsByUserId(@Param('userId') userId: "string") {
        return this.itemsService.getByUserId(parseInt(userId))
    }
}

