import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";
import API_ENDPOINTS from "./endpoints";

// Product interface definition
export interface Scan {
  id: string;
  domain: string;
  startTime: string; // ISO string format for dates
  endTime: string; // ISO string format for dates
}

// interface responseType {
//   limit: number;
//   page: number;
//   products: Scan[];
//   totalCount: number;
// }

// Fetch products function
const fetchScans = async (): Promise<Scan[]> => {
  const response = await apiClient.get(`${API_ENDPOINTS.SCANS.GET_ALL_SCANS}`);
  return response.data;
};

// Custom hook for infinite scrolling
const useGetScans = () => {
  return useQuery<Scan[], Error>({
    queryKey: ["scans"],
    queryFn: fetchScans,
  });
};

export default useGetScans;
