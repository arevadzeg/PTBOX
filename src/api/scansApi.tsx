import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";
import API_ENDPOINTS from "./endpoints";

// Product interface definition
export interface Scan {
  id: string;
  domain: string;
  startTime: string; // ISO string format for dates
  endTime: string; // ISO string format for dates
  sortOrder: number;
}

interface UpdateSortOrderRequest {
  id: string;
  newSortOrder: number;
}

// Fetch product scans function
const fetchScans = async (): Promise<Scan[]> => {
  const response = await apiClient.get(`${API_ENDPOINTS.SCANS.GET_ALL_SCANS}`);
  return response.data;
};

const fetchSingleScan = async (scanId: string): Promise<Scan> => {
  const response = await apiClient.get(
    `${API_ENDPOINTS.SCANS.GET_SCAN_BY_ID}/${scanId}`
  );
  return response.data;
};

// Custom hook for infinite scrolling
const useGetScans = () => {
  return useQuery<Scan[], Error>({
    queryKey: ["scans"],
    queryFn: fetchScans,
  });
};
export const useGetSingleScan = (scanId: string) => {
  return useQuery<Scan, Error>({
    queryKey: ["scan", scanId],
    queryFn: () => fetchSingleScan(scanId),
  });
};

const updateSortOrder = async (data: UpdateSortOrderRequest): Promise<void> => {
  const response = await apiClient.post(API_ENDPOINTS.SCANS.SORT_SCAN, data);
  if (response.status !== 200) {
    throw new Error("Failed to update scan order");
  }
};

// Custom hook for using the mutation
export const useUpdateSortOrder = () => {
  return useMutation<void, Error, UpdateSortOrderRequest>({
    mutationFn: updateSortOrder,
    onSuccess: () => {
      console.log("Scan order updated successfully");
      // Optionally, you could invalidate queries here to refetch updated data
    },
    onError: (error) => {
      console.error("Error updating scan order:", error);
    },
  });
};

export default useGetScans;
