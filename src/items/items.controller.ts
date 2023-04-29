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
    getProducts() {
        return this.itemsService.getAll()
    }

    @Get('/:id')
    getProduct(@Param('id') id: "string") {
        return this.itemsService.getById(parseInt(id))
    }

    @Post()
    addProduct(@Body() body: CreateItemDto) {
        console.log(body)
        return this.itemsService.add(body.title, body.description, body.category, body.image, body.userId)
    }

    @Delete('/:id')
    @HttpCode(204)
    removeProduct(@Param('id') id: string) {
        this.itemsService.remove(parseInt(id))
    }

    @Put('/:id')
    editProduct(@Body() body: EditItemDto, @Param('id') id: string) {
        return this.itemsService.edit(+id, body.title, body.description, body.category, body.image)
    }
}

