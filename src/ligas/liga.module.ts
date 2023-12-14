import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Liga } from './liga.entity';
import { LigaController } from './liga.controller';
import { LigaService } from './liga.service';

@Module({
    imports: [TypeOrmModule.forFeature([Liga])], 
    controllers: [LigaController],
    providers: [LigaService]
})
export class LigaModule {}
