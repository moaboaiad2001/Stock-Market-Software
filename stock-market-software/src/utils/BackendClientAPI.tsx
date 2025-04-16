import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Update this if your backend runs elsewhere

export interface User {
  user_id: number;
  email: string;
  created_at: string;
}

export interface NewUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  date_of_birth: string;
  id_number: string;
  id_type: string;
  is_primary?: boolean;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

// Helper function to handle requests without using AxiosError
const sendRequest = async <T,>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: Record<string, any> // Specify `Record<string, any>` instead of `object`
): Promise<T> => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    });
    return response.data as T; // Assert the response data type to T
  } catch (error) {
    // Catch generic errors and throw a message
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    throw new Error(errorMessage);
  }
};

export const sendVerification = async (phoneNumber: string) => {
  return sendRequest<any>("/send-verification", "POST", { phoneNumber });
};

export const verifyOtp = async (phoneNumber: string, code: string) => {
  return sendRequest<any>("/verify-otp", "POST", { phoneNumber, code });
};

export const createUser = async (user: NewUser) => {
  return sendRequest<{ message: string; user: User }>(
    "/api/users",
    "POST",
    user
  );
};

export const login = async (
  email: string,
  password: string
): Promise<{ message: string; user: User }> => {
  return sendRequest<{ message: string; user: User }>("/api/login", "POST", {
    email,
    password,
  });
};

export const getUserByEmail = async (email: string) => {
  return sendRequest<User>(`/api/users/${encodeURIComponent(email)}`, "GET");
};
