import mongoose from "mongoose";

interface ProductsInterface {
  productID: mongoose.Schema.Types.ObjectId;
  size: string;
  quantity: number;
  title: string;
}

interface DeliveryInfosInterface {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

interface PaymentInterface {
  method: string;
  status: string;
  money: number;
}

export interface OrdersInterface extends mongoose.Document {
  products: ProductsInterface[];
  owner: mongoose.Schema.Types.ObjectId;
  deliveryInformation: DeliveryInfosInterface;
  payment: PaymentInterface;
  statusDelivery: string;
  createdAt?: string;
  updatedAt?: string;
}

const orderSchema = new mongoose.Schema<OrdersInterface>(
  {
    products: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        size: {
          type: String,
        },
        quantity: {
          type: Number,
          min: 0,
        },
        title: {
          type: String,
        },
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deliveryInformation: {
      firstName: String,
      lastName: String,
      email: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      phone: String,
    },
    payment: {
      method: String,
      status: String,
      money: Number,
    },
    statusDelivery: {
      type: String,
      default: "Order Placed",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model<OrdersInterface>("Order", orderSchema);
