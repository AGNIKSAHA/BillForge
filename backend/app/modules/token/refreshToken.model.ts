import mongoose, { Schema, Types, HydratedDocument, Model } from "mongoose";



export interface IRefreshToken {
  userId: Types.ObjectId;
  token: string;
  expiresAt: Date;
}



export type IRefreshTokenDocument =
  HydratedDocument<IRefreshToken>;



const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    token: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 } // TTL auto delete
    }
  },
  {
    timestamps: true
  }
);



export const RefreshToken: Model<IRefreshToken> =
  mongoose.model<IRefreshToken>(
    "RefreshToken",
    refreshTokenSchema
  );


  
