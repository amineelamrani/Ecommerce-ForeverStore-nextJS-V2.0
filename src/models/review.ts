import mongoose from "mongoose";

export interface userDoc extends mongoose.Document {
  name: string;
}

export interface ReviewInterface extends mongoose.Document {
  owner: mongoose.Schema.Types.ObjectId | userDoc;
  ownerName: string;
  content: string;
  rating: number;
  product: mongoose.Schema.Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}

const reviewSchema = new mongoose.Schema<ReviewInterface>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ownerName: String,
    content: String,
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Review ||
  mongoose.model<ReviewInterface>("Review", reviewSchema);
