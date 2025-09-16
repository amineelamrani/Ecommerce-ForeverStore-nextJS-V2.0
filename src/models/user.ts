import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

interface FavouriteInterface {
  product: mongoose.Schema.Types.ObjectId;
  size: string;
}

export interface UserInterface extends mongoose.Document {
  name: string;
  email: string;
  admin: boolean;
  password: string;
  confirmPassword: string | undefined;
  isValid: boolean;
  uniqueString: string;
  passwordResetToken?: string;
  passwordResetExpires?: string;
  orders: mongoose.Schema.Types.ObjectId[];
  favourites: FavouriteInterface[];
  createdAt?: string;
  updatedAt?: string;
}

const userSchema = new mongoose.Schema<UserInterface>(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    admin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: 8,
      //   select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same",
      },
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    uniqueString: {
      type: String,
    },
    passwordResetToken: String,
    passwordResetExpires: String,
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    favourites: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        size: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

// pre function before saving to hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // when creating a new password or modifying it we will hash it before save
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

export default mongoose.models.User ||
  mongoose.model<UserInterface>("User", userSchema);
