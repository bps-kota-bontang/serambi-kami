import { API_BASE_URL } from "@/configs/Constant";
import { handleResponse } from "@/utils/Response";

export const me = async () => {
  const response = await fetch(`${API_BASE_URL}/v1/users/me`, {
    credentials: "include",
  });

  return await handleResponse(response);
};

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/v1/users`, {
    credentials: "include",
  });

  return await handleResponse(response);
};

export const updateUserPassword = async (userId: string, data: any) => {
  const response = await fetch(`${API_BASE_URL}/v1/users/${userId}/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return await handleResponse(response);
};
