import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

export interface Admin extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}
