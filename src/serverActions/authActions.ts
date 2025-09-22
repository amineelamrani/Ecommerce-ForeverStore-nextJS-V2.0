"use server";

import dbConnect from "@/lib/database/dbConnect";
import { User } from "@/models/models";
import { transporter } from "@/utils/email";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export interface InitialSignUpInterface {
  error: {
    error: boolean;
    message: string;
  };
  userMail: null | string;
}

export interface InitialSignInInterface {
  error: {
    error: boolean;
    message: string;
  };
  currentUser: null | {
    name: string;
    email: string;
    orders: string;
    favourites: string;
    admin: boolean;
  };
}

export const signUpServerAction = async (
  initialState: InitialSignUpInterface,
  formData: FormData
) => {
  // This is the server Action that will handle the sign up request received from the client
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  if (
    !rawFormData.email ||
    !rawFormData.password ||
    !rawFormData.confirmPassword ||
    !rawFormData.name
  ) {
    return {
      error: {
        error: true,
        message: "Please provide All Requested Fields",
      },
      userMail: null,
    };
  }

  if (rawFormData.confirmPassword !== rawFormData.password) {
    return {
      error: {
        error: true,
        message: "Passwords aren't Identical",
      },
      userMail: null,
    };
  }

  await dbConnect();
  const uniqueString = generateRandomString();
  const newUser = await User.create({
    name: rawFormData.name,
    email: rawFormData.email,
    password: rawFormData.password,
    confirmPassword: rawFormData.confirmPassword,
    uniqueString,
  });

  if (newUser) {
    //User created successfully but not validated, not to be validated by confirmation mail
    sendMailConfirmation(
      rawFormData.email.toString(),
      rawFormData.name.toString(),
      uniqueString
    );
    return {
      error: {
        error: false,
        message: "",
      },
      userMail: rawFormData.email.toString(),
    };
  }

  return {
    userMail: null,
    error: {
      error: true,
      message: "There was an error try again later",
    },
  };
};

export const signInServerAction = async (
  initialState: InitialSignInInterface,
  formData: FormData
) => {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (!rawFormData.email || !rawFormData.password) {
    return {
      error: {
        error: true,
        message: "Please provide email and password",
      },
      currentUser: null,
    };
  }
  await dbConnect();
  const userImpacted = await User.findOne({ email: rawFormData.email });
  if (!userImpacted || !userImpacted.isValid) {
    return {
      error: {
        error: true,
        message: "User Not Found or not confirmed",
      },
      currentUser: null,
    };
  }
  const validPassword = bcrypt.compareSync(
    rawFormData.password.toString(),
    userImpacted.password
  );
  if (!validPassword) {
    return {
      error: {
        error: true,
        message: "email or password is invalid",
      },
      currentUser: null,
    };
  }
  (await cookies()).set({
    name: "foreverEcommNext_2.0",
    value: signToken(userImpacted._id.toString()),
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  return {
    error: {
      error: false,
      message: "",
    },
    currentUser: {
      name: userImpacted.name,
      email: userImpacted.email,
      orders: JSON.stringify(userImpacted.orders),
      favourites: JSON.stringify(userImpacted.favourites),
      admin: userImpacted.admin,
    },
  };
};

const generateRandomString = () => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

const sendMailConfirmation = async (
  newUserMail: string,
  newUserName: string,
  uniqueString: string
) => {
  await transporter.sendMail({
    from: `${process.env.NODE_MAIL}`,
    to: newUserMail, // list of receivers
    subject: `Welcome ${newUserName}! (Email Adress Confirmation)`, // Subject line
    text: `unique String ${uniqueString}`, // plain text body
    html: `<h1>Welcome ${newUserName}</h1>
      <p>Please visit this link to confirm your account.<br/>Do not share this Link with anyone</p>
      <p>Your Unique String : </p>
      <p><samp>${uniqueString}</samp></p>
    `,
    // html: "<b>Hello world?</b>", // html body
  });
};

const signToken = (id: string) => {
  return jwt.sign({ id: id }, process.env.SECRET_JWT_KEY!);
};
