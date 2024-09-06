import { useCallback, useEffect, useState } from "react";
import { getServices } from "@/api/Service";
import { Service } from "@/types/Service";

const useServices = (
  keyword: string,
  tags: string[],
  page: number,
  limit: number
) => {
  const [services, setServices] = useState<Service[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getServices(keyword, tags, page, limit);
      setServices(data.services);
      setTotal(data.total);
      setError(null);
    } catch (error) {
      setError("An error occurred while fetching services.");
      console.error("An error occurred: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [keyword, tags, page, limit]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { services, total, isLoading, error, fetchServices };
};

export default useServices;
