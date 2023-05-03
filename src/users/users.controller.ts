import { Body, Controller, Get, Param, Post, Delete, HttpCode, Put } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user-dto";
import { UsersService } from "./users.service";
import { EditUserDto } from "./dtos/edit-user.dto";


@Controller('users')
export class UsersController {
    private usersService;
    constructor(usersService: UsersService) {
        this.usersService = usersService;
    }

    @Get()
    getUsers() {
        return this.usersService.getAll()
    }

    @Get('/:id')
    getUser(@Param('id') id: "string") {
        return this.usersService.getById(parseInt(id))
    }

    @Post()
    addUser(@Body() body: CreateUserDto) {
        console.log(body)
        return this.usersService.add(body.userName, body.description, body.avatar, body.rating)
    }

    @Delete('/:id')
    @HttpCode(204)
    removeUser(@Param('id') id: string) {
        this.usersService.remove(parseInt(id))
    }

    @Put('/:id')
    editUser(@Body() body: EditUserDto, @Param('id') id: string) {
        return this.usersService.edit(+id, body.description, body.avatar)
    }
}

