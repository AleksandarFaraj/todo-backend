import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TodosModule } from './todos/todos.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [TodosModule, ConfigModule.forRoot({ envFilePath: ['.env.development.local', '.env.development', '.env'] })],
  controllers: [AppController],
})
export class AppModule { }
