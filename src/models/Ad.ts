import { Model, Schema, model, models } from "mongoose";
import { UploadResponse } from "imagekit/dist/libs/interfaces";

export type Ad = {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  contact: string;
  images: UploadResponse[];
  location: {
    lat: number;
    lng: number;
  };
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
};

const adSchema = new Schema<Ad>(
  {
    title: String,
    description: String,
    price: Number,
    category: String,
    contact: String,
    images: [Object],
    location: Object,
    userEmail: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const AdModel = (models?.Ad as Model<Ad>) || model<Ad>("Ad", adSchema);
