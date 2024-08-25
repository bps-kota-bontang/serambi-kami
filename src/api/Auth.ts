import { API_BASE_URL } from "@/configs/Constant";
import { handleResponse } from "@/utils/Response";

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "X-App-Type": "web",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return await handleResponse(response);
};
