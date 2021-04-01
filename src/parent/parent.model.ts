import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ParentSchema = new mongoose.Schema({
  //
});

export interface Parent extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  childrens: [object];
}
