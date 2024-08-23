import { API_BASE_URL } from "@/configs/Constant";
import { Service } from "@/types/Service";

export const getServices = async (
  keyword: string,
  tags: string[],
  page: number,
  limit: number
) => {
  const queryParams = new URLSearchParams({
    keyword,
    tags: tags.join(","),
    page: page.toString(),
    limit: limit.toString(),
  });

  const response = await fetch(
    `${API_BASE_URL}/v1/services?${queryParams.toString()}`,
    {
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data as { services: Service[]; total: number };
};

export const getServiceTags = async (type?: string) => {
  const queryParams = new URLSearchParams();

  if (type) {
    queryParams.set("type", type);
  }
  const response = await fetch(
    `${API_BASE_URL}/v1/services/tags?${queryParams.toString()}`,
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

export const getService = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/v1/services/${id}`, {
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
};

export const createService = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/v1/services`, {
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

export const updateService = async (serviceId: string, data: any) => {
  const response = await fetch(`${API_BASE_URL}/v1/services/${serviceId}`, {
    method: "PUT",
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

export const deleteService = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/v1/services/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message);
  }
};
