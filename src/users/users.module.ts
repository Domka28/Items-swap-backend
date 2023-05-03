// {
//     "id": 1,
//     "userName": "ania025",
//     "avatar": "https://cutt.ly/q84VYDQ",
//     "description": "Cześć jestem Ania, chętnie wymienię swoje rzeczy lub oddam za darmo. Sprawdź, czy jesteś czymś zainteresowany i daj znać!",
//     "rating": {
//         "rate": 4.5,
//         "count": 120
//     }
// },

import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule { }