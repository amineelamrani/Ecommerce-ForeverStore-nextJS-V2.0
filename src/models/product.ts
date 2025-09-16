import mongoose from "mongoose";

export interface ProductsInterface extends mongoose.Document {
  title: string;
  description: string;
  price: number;
  sizes: string[];
  images: string[];
  category: string[];
  subCategory: string[];
  reviewsNumber: number;
  reviewsMedian: number;
  ordersNumber: number;
  createdAt?: string;
  updatedAt?: string;
}

const productSchema = new mongoose.Schema<ProductsInterface>(
  {
    title: {
      type: String,
      required: [true, "Please give the product a title!"],
    },
    description: {
      type: String,
      required: [true, "Please give the product a description!"],
    },
    price: {
      type: Number,
      required: [true, "Please give the product a description!"],
    },
    sizes: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    category: [
      {
        type: String,
      },
    ],
    subCategory: [
      {
        type: String,
      },
    ],
    reviewsNumber: {
      type: Number,
      default: 0,
    },
    reviewsMedian: {
      // To update each time we have a new create or save here or in the reviews model
      type: Number,
      default: 0,
    },
    ordersNumber: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<ProductsInterface>("Product", productSchema);
