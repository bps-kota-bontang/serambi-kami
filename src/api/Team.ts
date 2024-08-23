import { API_BASE_URL } from "@/configs/Constant";

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

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
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

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
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

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
};