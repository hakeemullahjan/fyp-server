import { Body, Controller, Post } from '@nestjs/common';
import { DriverService } from './driver.service';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('/add')
  async addDriver(
    @Body('name') name: string,
    @Body('cnic') cnic: number,
    @Body('age') age: number,
  ) {
    try {
      const response = await this.driverService.addDriver(name, cnic, age);
      return {
        responseCode: 201,
        responseMessage: 'Driver successfully Added!',
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
