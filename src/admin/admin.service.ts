import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './admin.model';
import * as bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
  ) {}

  async registerAdmin(name: string, email: string, password: string) {
    try {
      const checkMail = await this.adminModel.findOne({ email });
      if (checkMail) {
        throw 'Admin already exists!';
      }
      let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const newAdmin = await this.adminModel.create({
        name,
        email,
        password: hash,
      });
      return newAdmin;
    } catch (error) {
      throw error;
    }
  }

  async loginAdmin(email: string, password: string) {
    try {
      const foundAdmin = await this.adminModel.findOne({ email });
      if (!foundAdmin) {
        throw 'Email and password invalid!';
      }
      if (!bcrypt.compareSync(password, foundAdmin.password)) {
        throw 'Email and password invalid!';
      }
      const token = jwt.sign({ adminId: foundAdmin._id }, 'my_secret', {});
      return { token, foundAdmin };
    } catch (error) {
      throw error;
    }
  }
}
