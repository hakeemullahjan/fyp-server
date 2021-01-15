import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  seatNumber: {
    type: String,
  },
  stdClass: {
    type: String,
  },
  bus: {
    type: Schema.Types.ObjectId,
    ref: 'Bus',
  },
  checkIns: {
    type: String,
  },
  checkOuts: {
    type: String,
  },
});

export interface Student extends mongoose.Document {
  name: string;
  seatNumber: string;
  stdClass: string;
  bus: string;
  checkIns: string;
  checkOuts: string;
}
