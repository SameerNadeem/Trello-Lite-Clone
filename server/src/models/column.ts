import { Schema, model } from "mongoose";
import { ColumnDocument } from "../types/column.interface";

const columnSchema = new Schema<ColumnDocument>({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  boardId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export default model<ColumnDocument>("Column", columnSchema);
