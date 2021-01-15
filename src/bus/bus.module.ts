import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusController } from './bus.controller';
import { BusSchema } from './bus.model';
import { BusService } from './bus.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Bus', schema: BusSchema }])],
  controllers: [BusController],
  providers: [BusService],
})
export class BusModule {}
