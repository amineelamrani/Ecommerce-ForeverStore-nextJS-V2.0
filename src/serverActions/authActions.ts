"use server";

export interface InitialSignUpInterface {
  status: string | null;
  message: string;
  error: boolean;
}

export const signUpServerAction = async (
  initialState: InitialSignUpInterface,
  formData: FormData
) => {
  // This is the server Action that will handle the sign up request received from the client
  return {
    status: "success",
    message: "",
    error: false,
  };
};
