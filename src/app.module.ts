import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports: [ItemsModule, UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
      entities: ['**/*.entity.js']
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' }
    })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
