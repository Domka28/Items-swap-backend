import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"
import { SwapService } from "./swap.service";
import { Swap } from "./swap.entity";
import { SwapController } from "./swap.controller";
import { ItemsService } from "src/items/items.service";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/user.entity";
import { Item } from "src/items/item.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Swap]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Item])],
    controllers: [SwapController],
    providers: [SwapService, ItemsService, UsersService]
})
export class SwapModule { }