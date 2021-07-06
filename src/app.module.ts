import {
  MiddlewareConsumer,
  Module,
  NestModule,
  Req,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { ParentModule } from './parent/parent.module';
import { SchoolModule } from './school/school.module';
import { BusModule } from './bus/bus.module';
import { DriverModule } from './driver/driver.module';
import { AdminModule } from './admin/admin.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://fypdb:fypdb@cluster0.xrxds.mongodb.net/fypdb?retryWrites=true&w=majority',
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
    StudentModule,
    ParentModule,
    SchoolModule,
    BusModule,
    DriverModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(
      // protected route
      //driver
      // { path: 'driver/add', method: RequestMethod.POST },
      // //bus
      // { path: 'bus/add', method: RequestMethod.POST },
      // { path: 'bus', method: RequestMethod.GET },
      // { path: 'bus/:_id', method: RequestMethod.GET },
      // { path: 'bus/:_id', method: RequestMethod.PATCH },
      // { path: 'bus/:_id', method: RequestMethod.DELETE },
      // //student
      // { path: 'student/add', method: RequestMethod.POST },
      // { path: 'student', method: RequestMethod.GET },
      // { path: 'student/:_id', method: RequestMethod.GET },
      // { path: 'student/:_id', method: RequestMethod.PATCH },
      // { path: 'student/:_id', method: RequestMethod.DELETE },
    );
  }
}
