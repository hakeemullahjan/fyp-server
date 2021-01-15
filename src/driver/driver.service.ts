import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver } from './driver.model';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel('Driver') private readonly driverModel: Model<Driver>,
  ) {}

  async addDriver(name: string, cnic: number, age: number) {
    try {
      const checkCNIC = await this.driverModel.findOne({ cnic });
      if (checkCNIC) {
        throw 'Driver already exists!';
      }

      const newDriver = await this.driverModel.create({
        name,
        cnic,
        age,
      });
      return newDriver;
    } catch (error) {
      throw error;
    }
  }
}
