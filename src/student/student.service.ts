import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bus } from 'src/bus/bus.model';
import { Student } from './student.model';
import * as mongoose from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('Student') private readonly studentModel: Model<Student>,
    @InjectModel('Bus') private readonly busModel: Model<Bus>,
  ) {}

  async addStudent(req: any) {
    try {
      const { name, seatNumber, stdClass, bus } = req;
      const checkStd = await this.studentModel.findOne({ seatNumber });
      if (checkStd) {
        throw 'Student already exists!';
      }

      const checkBus = await this.busModel.findById({ _id: bus }).exec();
      if (!checkBus) {
        throw 'Could not find Bus!';
      }

      const newStd = await this.studentModel.create({
        name,
        seatNumber,
        stdClass,
        bus,
      });

      await this.busModel.findByIdAndUpdate(checkBus._id, {
        $push: { students: newStd._id },
      });

      return newStd;
    } catch (error) {
      throw error;
    }
  }

  async getAllStudents() {
    try {
      const students = await this.studentModel.find().exec();
      return students;
    } catch (error) {
      throw error;
    }
  }

  async getASingleStudent(_id: string) {
    try {
      const std = await this.studentModel.findById(_id).populate('bus').exec();
      if (!std) {
        throw 'Could not find Student!';
      }
      return std;
    } catch (error) {
      throw error;
    }
  }

  async updateStudent(_id: string, req: any) {
    try {
      const { bus } = req;

      const std = await this.studentModel.findById(_id).exec();
      if (!std) {
        throw 'Could not find Student!';
      }
      let checkBus = null;
      if (bus) {
        checkBus = await this.busModel.findById({ _id: bus }).exec();
        if (!checkBus) {
          throw 'Could not find Bus!';
        }
      }

      const result = await this.studentModel.updateOne({ _id }, { $set: req });
      if (result.n === 0) {
        throw 'Could not find Student!';
      }

      if (bus != std.bus) {
        //add student into new bus
        await this.busModel.findByIdAndUpdate(bus, {
          $push: { students: std._id },
        });
        //remove student from previous bus
        await this.busModel.findByIdAndUpdate(
          { _id: std.bus },
          {
            $pull: {
              students: mongoose.Types.ObjectId(std._id),
            },
          },
        );
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async removeStudent(_id: string) {
    try {
      const std = await this.studentModel.findById(_id).exec();
      if (!std) {
        throw 'Could not find Student!';
      }

      const response = await this.studentModel.deleteOne({ _id }).exec();
      //remove student from bus
      await this.busModel.findByIdAndUpdate(
        { _id: std.bus },
        {
          $pull: {
            students: mongoose.Types.ObjectId(std._id),
          },
        },
      );
      if (response.n === 0) {
        throw 'Could not find Student!';
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
}
