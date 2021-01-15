import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusSchema } from 'src/bus/bus.model';
import { StudentController } from './student.controller';
import { StudentSchema } from './student.model';
import { StudentService } from './student.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Student', schema: StudentSchema },
      { name: 'Bus', schema: BusSchema },
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
