// apiClient.ts
"use client"; // Add this line

import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080", // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

//

// Response Interceptors
apiClient.interceptors.response.use(
  (response) => {
    return response; // Return only the data from the response
  },
  (error) => {
    // Handle errors here (e.g., logging, showing notifications)
    return Promise.reject(error.response ? error.response.data : error.message);
  }
);

export default apiClient;
