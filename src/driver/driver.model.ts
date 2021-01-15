import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const DriverSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  cnic: {
    type: Number,
    unique: true,
  },
});

export interface Driver extends mongoose.Document {
  name: string;
  age: number;
  cnic: number;
}
