import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/register')
  async registerAdmin(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const response = await this.adminService.registerAdmin(
        name,
        email,
        password,
      );
      return {
        responseCode: 201,
        responseMessage: 'Admin successfully Registered !',
        result: response,
      };
    } catch (error) {
      return {
        responseCode: 400,
        responseMessage: error,
      };
    }
  }

  @Post('/login')
  async loginAdmin(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const response = await this.adminService.loginAdmin(email, password);
      return {
        responseCode: 200,
        responseMessage: 'Admin successfully login !',
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
