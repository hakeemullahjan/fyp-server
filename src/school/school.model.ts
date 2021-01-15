import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const SchoolSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

export interface School extends mongoose.Document {
  email: string;
  password: String;
}
