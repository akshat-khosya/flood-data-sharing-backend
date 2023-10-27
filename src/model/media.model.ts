import mongoose from "mongoose";

export enum MEDIA_TYPES {
  PNG = "png",
  MP4 = "mp4",
}

export interface IMedia {
  userId: mongoose.Types.ObjectId;
  imageName: string;
  mediaType: MEDIA_TYPES;
  latitude: string;
  longitude: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IMedia>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    imageName: {
      type: String,
      required: true,
      unique: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
      default: MEDIA_TYPES.PNG,
      enum: MEDIA_TYPES,
    },
  },
  {
    timestamps: true,
  }
);

export const Media = mongoose.model<IMedia>("Media", userSchema);
