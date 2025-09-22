"use server";

import dbConnect from "@/lib/database/dbConnect";
import { User } from "@/models/models";
import { transporter } from "@/utils/email";

export interface InitialSignUpInterface {
  error: {
    error: boolean;
    message: string;
  };
  userMail: null | string;
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
    userMail: "",
    error: {
      error: false,
      message: "This is a test",
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
