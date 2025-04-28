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

const getToken = () => localStorage.getItem('token');

// Helper function to handle requests with token support
const sendRequest = async <T,>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: Record<string, any>,
  requireToken: boolean = false
): Promise<T> => {
  const token = getToken();
  if (requireToken && !token) {
    throw new Error('No token found. Please log in or sign up first.');
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      headers,
      data: body,
    });
    return response.data as T;
  } catch (error) {
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
  const response = await sendRequest<{ message: string; user: User; token: string }>(
    "/api/users",
    "POST",
    user
  );
  // Store the token after signup
  localStorage.setItem('token', response.token);
  return response;
};

export const login = async (
  email: string,
  password: string
): Promise<{ message: string; user: User; token: string }> => {
  const response = await sendRequest<{ message: string; user: User; token: string }>("/api/login", "POST", {
    email,
    password,
  });
  // Store the token after login
  localStorage.setItem('token', response.token);
  return response;
};

export const getUserByEmail = async (email: string) => {
  return sendRequest<User>(`/api/users/${encodeURIComponent(email)}`, "GET", undefined, true);
};

// Optional: Function to clear the token on logout
export const logout = () => {
  localStorage.removeItem('token');
};