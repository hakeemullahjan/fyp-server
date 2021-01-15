import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const BusSchema = new mongoose.Schema({
  registrationNo: {
    type: String,
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'Driver',
  },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student', unique: true }],
  location: [
    {
      timestamp: Number,
      coords: {
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number,
      },
    },
  ],
  pickUp: {
    type: Object,
  },
  drop: {
    type: Object,
  },
});

export interface Bus extends mongoose.Document {
  registrationNo: string;
  driver: string;
  students: [object];
  location: [];
  pickUp: object;
  drop: object;
}
