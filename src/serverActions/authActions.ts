"use server";

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
  return {
    userMail: "",
    error: {
      error: false,
      message: "This is a test",
    },
  };
};
