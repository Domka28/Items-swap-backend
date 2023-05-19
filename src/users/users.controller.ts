import { Body, Controller, Get, Param, Post, Delete, HttpCode, Put, UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user-dto";
import { UsersService } from "./users.service";
import { EditUserDto } from "./dtos/edit-user.dto";


@Controller('users')
export class UsersController {
    private usersService;
    constructor(usersService: UsersService) {
        this.usersService = usersService;
    }

    @Get('/:id')
    @UseInterceptors(ClassSerializerInterceptor)
    getUser(@Param('id') id: "string") {
        return this.usersService.getById(parseInt(id))
    }

    @Get('/profile/:userName')
    @UseInterceptors(ClassSerializerInterceptor)
    getUserByName(@Param('userName') userName: "string") {
        return this.usersService.getByUserName(userName)
    }

    @Post()
    addUser(@Body() body: CreateUserDto) {
        return this.usersService.add(body.userName, body.avatar, body.description, body.rate, body.ratingCount)
    }

    @Delete('/:id')
    @HttpCode(204)
    removeUser(@Param('id') id: string) {
        this.usersService.remove(parseInt(id))
    }

    @Put('/profile/:id')
    editUser(@Body() body: EditUserDto, @Param('id') id: string) {
        return this.usersService.edit(+id, body.avatar, body.description)
    }

}

