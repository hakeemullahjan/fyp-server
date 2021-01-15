import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Request,
  Param,
} from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('/add')
  async addStudent(@Req() req: Request) {
    try {
      const response = await this.studentService.addStudent(req.body);
      return {
        responseCode: 201,
        responseMessage: 'Student successfully Added!',
        result: response,
      };
    } catch (error) {
      return {
        responseCode: 400,
        responseMessage: error,
      };
    }
  }

  @Get('/')
  async getStudents() {
    try {
      const response = await this.studentService.getAllStudents();
      return {
        responseCode: 200,
        responseMessage: 'All registered students!',
        result: response,
      };
    } catch (error) {
      return {
        responseCode: 400,
        responseMessage: error,
      };
    }
  }

  @Get('/:_id')
  async getStudent(@Param('_id') _id: string) {
    try {
      const response = await this.studentService.getASingleStudent(_id);
      return {
        responseCode: 200,
        responseMessage: 'My requested student!',
        result: response,
      };
    } catch (error) {
      return {
        responseCode: 400,
        responseMessage: error,
      };
    }
  }

  @Patch('/:_id')
  async updateStudent(@Req() req: Request, @Param('_id') _id: string) {
    try {
      const response = await this.studentService.updateStudent(_id, req.body);
      return {
        responseCode: 200,
        responseMessage: 'Student successfully Updated!',
        result: response,
      };
    } catch (error) {
      return {
        responseCode: 400,
        responseMessage: error,
      };
    }
  }

  @Delete('/:_id')
  async removeStudent(@Param('_id') _id: string) {
    try {
      const response = await this.studentService.removeStudent(_id);
      return {
        responseCode: 200,
        responseMessage: 'Student successfully Deleted!',
        result: response,
      };
    } catch (error) {
      return {
        responseCode: 400,
        responseMessage: error,
      };
    }
  }
}
