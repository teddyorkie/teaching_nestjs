import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinecraftController } from './minecraft/minecraft.controller';

@Module({
  imports: [],
  controllers: [AppController, MinecraftController],
  providers: [AppService],
})
export class AppModule {}
