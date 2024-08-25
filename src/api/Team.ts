import { API_BASE_URL } from "@/configs/Constant";
import { handleResponse } from "@/utils/Response";

export const getTeams = async (type?: string) => {
  const queryParams = new URLSearchParams();

  if (type) {
    queryParams.set("type", type);
  }
  const response = await fetch(
    `${API_BASE_URL}/v1/teams?${queryParams.toString()}`,
    {
      credentials: "include",
    }
  );

  return await handleResponse(response);
};

export const updateTeamUsers = async (teamId: string, data: any) => {
  const response = await fetch(`${API_BASE_URL}/v1/teams/${teamId}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return await handleResponse(response);
};

export const createTeam = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/v1/teams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return await handleResponse(response);
};

export const deleteTeam = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/v1/teams/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  await handleResponse(response);
};
