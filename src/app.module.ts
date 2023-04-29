import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [ItemsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'items.sqlite',
      synchronize: true,
      entities: ['**/*.entity.js']
    })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
