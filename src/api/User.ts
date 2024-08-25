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
