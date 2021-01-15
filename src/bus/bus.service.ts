import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bus } from './bus.model';

@Injectable()
export class BusService {
  constructor(@InjectModel('Bus') private readonly busModel: Model<Bus>) {}

  async addBus(req: any) {
    try {
      const { registrationNo, driver } = req;
      const checkBus = await this.busModel.findOne({ registrationNo });
      if (checkBus) {
        throw 'Bus already exists!';
      }
      const newBus = await this.busModel.create({
        registrationNo,
        driver,
      });
      return newBus;
    } catch (error) {
      throw error;
    }
  }

  async getAllBuses() {
    try {
      const buses = await this.busModel
        .find()
        // .populate('driver', '_id')
        // .populate('students', '_id')
        .exec();
      return buses;
    } catch (error) {
      throw error;
    }
  }

  async getASingleBus(_id: string) {
    try {
      const bus = await this.busModel.findById(_id).populate('driver').exec();
      if (!bus) {
        throw 'Cound not find Bus!';
      }
      return bus;
    } catch (error) {
      throw error;
    }
  }

  async updateBus(_id: string, req: any) {
    try {
      const result = await this.busModel.updateOne({ _id }, { $set: req });
      if (result.n === 0) {
        throw 'Cound not find Bus!';
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async removeBus(_id: string) {
    try {
      const response = await this.busModel.deleteOne({ _id }).exec();
      if (response.n === 0) {
        throw 'Cound not find Bus!';
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
}
