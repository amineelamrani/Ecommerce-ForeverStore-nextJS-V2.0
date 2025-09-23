"use server";

import dbConnect from "@/lib/database/dbConnect";
import { User } from "@/models/models";
import { transporter } from "@/utils/email";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
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

export interface InitialForgotPassInterface {
  error: {
    error: boolean;
    message: string;
  };
  handled: boolean;
  email: string;
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

export const accountConfirmationServerAction = async (
  mail: string,
  uniqueString: string
) => {
  await dbConnect();
  const unConfirmedUser = await User.findOne({ email: mail });
  if (!unConfirmedUser) {
    console.log("No user with that mail : ", mail);
    return null;
  }
  if (unConfirmedUser.isValid) {
    console.log("Account already valid : ", mail);
    return null;
  }
  if (uniqueString !== unConfirmedUser.uniqueString) {
    console.log("Does not Match the unique string you give : ", mail);
    return null;
  }
  unConfirmedUser.isValid = true;
  unConfirmedUser.confirmPassword = unConfirmedUser.password;
  await unConfirmedUser.save();

  (await cookies()).set({
    name: "foreverEcommNext_2.0",
    value: signToken(unConfirmedUser._id.toString()),
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
  console.log("Account verified : ", mail);
  return {
    name: unConfirmedUser.name,
    email: unConfirmedUser.email,
    orders: JSON.stringify(unConfirmedUser.orders),
    favourites: JSON.stringify(unConfirmedUser.favourites),
    admin: unConfirmedUser.admin,
  };
};

export const getAuthenticatedUser = async () => {
  // This server action to get the current User infos when open first our website - decision to handle it in the server do not persist currentUser infos through sessions
  await dbConnect();
  const tokenCookies = await cookies();
  const token = tokenCookies.get("foreverEcommNext_2.0")
    ? tokenCookies.get("foreverEcommNext_2.0")?.value
    : null;
  if (!token || token === "loggedout") return null;
  const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!);
  if (typeof decoded === "string") {
    return null;
  }

  const id = (decoded as JwtPayload).id;
  const checkUser = await User.findById(id);
  if (
    checkUser &&
    checkUser.name &&
    checkUser.name !== "" &&
    checkUser.isValid
  ) {
    return {
      name: checkUser.name,
      email: checkUser.email,
      orders: JSON.stringify(checkUser.orders),
      favourites: JSON.stringify(checkUser.favourites),
      admin: checkUser.admin,
    };
  }
  return null;
};

export const handleForgotPasswordForm = async (
  initialState: InitialForgotPassInterface,
  formData: FormData
) => {
  const email = formData.get("email");
  if (!email) {
    return {
      error: {
        error: true,
        message: "Mail not provided try again later",
      },
      handled: false,
      email: "",
    };
  }
  await dbConnect();
  const user = await User.findOne({ email });
  if (!user || !user.isValid) {
    return {
      error: {
        error: true,
        message: "User Not Found or not confirmed",
      },
      handled: false,
      email: email.toString(),
    };
  }

  const resetToken = generateRandomResetToken();
  user.passwordResetToken = signToken(resetToken);
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.confirmPassword = user.password;
  await user.save();

  sendResetMail(email.toString(), resetToken);
  return {
    error: {
      error: false,
      message: "",
    },
    handled: true,
    email: email.toString(),
  };
};

export const handleResetPasswordForm = async (
  initialState: InitialSignInInterface,
  formData: FormData
) => {
  const email = formData.get("email");
  const token = formData.get("token");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (!email || !token || !password || !confirmPassword) {
    return {
      error: {
        error: true,
        message: "Please provide all fields...",
      },
      currentUser: null,
    };
  }
  await dbConnect();
  const user = await User.findOne({ email: email.toString() });
  if (!user || !user.passwordResetToken) {
    return {
      error: {
        error: true,
        message: "An internal error occured...",
      },
      currentUser: null,
    };
  }

  const decoded = jwt.verify(
    user.passwordResetToken,
    process.env.SECRET_JWT_KEY!
  );
  if (typeof decoded === "string") {
    return {
      error: {
        error: true,
        message: "Cannot extract the token id",
      },
      currentUser: null,
    };
  }

  if ((decoded as JwtPayload).id === token) {
    if (user.passwordResetExpires > Date.now()) {
      user.password = password;
      user.confirmPassword = confirmPassword;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      (await cookies()).set({
        name: "foreverEcommNext_2.0",
        value: signToken(user._id.toString()),
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      return {
        error: {
          error: false,
          message: "",
        },
        currentUser: {
          name: user.name,
          email: user.email,
          orders: JSON.stringify(user.orders),
          favourites: JSON.stringify(user.favourites),
          admin: user.admin,
        },
      };
    } else {
      return {
        error: {
          error: true,
          message: "Reset token is expired",
        },
        currentUser: null,
      };
    }
  } else {
    return {
      error: {
        error: true,
        message: "Not the valid token. Please provide the valid token.",
      },
      currentUser: null,
    };
  }
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

const generateRandomResetToken = () => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < 25; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

const sendResetMail = async (email: string, resetToken: string) => {
  await transporter.sendMail({
    from: `${process.env.NODE_MAIL}`,
    to: email, // list of receivers
    subject: `Resetting Password `, // Subject line
    html: `<h1>Hello!</h1>
      <p>Please visit this link to reset your password.<br/>It is valid for only 1hour! Do not share this Link with anyone!!</p>
      <p>Here is your reset Token </br>${resetToken}</p>
      
    `,
  });
};
