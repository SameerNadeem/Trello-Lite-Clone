import { Schema, Document } from "mongoose";

export interface Board {
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId: Schema.Types.ObjectId;
}

export interface BoardDocument extends Document, Board {}
