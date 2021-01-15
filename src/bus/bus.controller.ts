import {
  Controller,
  Post,
  Request,
  Req,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { BusService } from './bus.service';

@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Post('/add')
  async addBus(@Req() req: Request) {
    try {
      const response = await this.busService.addBus(req.body);
      return {
        responseCode: 201,
        responseMessage: 'Bus successfully Added!',
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
  async getBuses() {
    try {
      const response = await this.busService.getAllBuses();
      return {
        responseCode: 200,
        responseMessage: 'All registered buses',
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
  async getBus(@Param('_id') _id: string) {
    try {
      const response = await this.busService.getASingleBus(_id);
      return {
        responseCode: 200,
        responseMessage: 'my requested bus',
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
  async updateBus(@Req() req: Request, @Param('_id') _id: string) {
    try {
      const response = await this.busService.updateBus(_id, req.body);
      return {
        responseCode: 200,
        responseMessage: 'Bus successfully Updated!',
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
  async removeBus(@Param('_id') _id: string) {
    try {
      const response = await this.busService.removeBus(_id);
      return {
        responseCode: 200,
        responseMessage: 'Bus successfully Deleted!',
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
