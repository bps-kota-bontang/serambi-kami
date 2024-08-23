import { API_BASE_URL } from "@/configs/Constant";

export const me = async () => {
  const response = await fetch(`${API_BASE_URL}/v1/users/me`, {
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
};

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/v1/users`, {
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
};
