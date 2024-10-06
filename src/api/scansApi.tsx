import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "./apiClient";
import API_ENDPOINTS from "./endpoints";

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

interface CreateScanRequest {
  domain: string;
}

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

const updateSortOrder = async (data: UpdateSortOrderRequest): Promise<void> => {
  await apiClient.post(API_ENDPOINTS.SCANS.SORT_SCAN, data);
};

const createScan = async (data: CreateScanRequest): Promise<void> => {
  await apiClient.post(API_ENDPOINTS.SCANS.CREATE_SCAN, data);
};

// HOOKS
export const useGetScans = () => {
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

// HOOKS FOR MUTATION
export const useUpdateSortOrder = () => {
  return useMutation<void, Error, UpdateSortOrderRequest>({
    mutationFn: updateSortOrder,
  });
};

export const useCreateScan = (callback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, CreateScanRequest>({
    mutationFn: createScan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scans"] });
      callback();
    },
  });
};
