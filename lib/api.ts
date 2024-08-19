import axios, { AxiosResponse } from "axios";

const server = "http://localhost:8000";

// TypeScript type for the response data
interface ApiResponse<T = any> extends AxiosResponse<T> {}

// Helper types for parameters
type Url = string;
type Token = string;
type PostData = Record<string, any>;

// GET request with authorization
export const getDataAPI = async (
  url: Url,
  token: Token
): Promise<ApiResponse> => {
  const res = await axios.get(`${server}/api/v1/${url}`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

// GET request without authorization
export const getDataAPINT = async (url: Url): Promise<ApiResponse> => {
  const res = await axios.get(`${server}/api/v1/${url}`, {
    withCredentials: true,
  });
  return res;
};

// POST request with authorization
export const postDataAPI = async (
  url: Url,
  post: PostData,
  token: Token
): Promise<ApiResponse> => {
  const res = await axios.post(`${server}/api/v1/${url}`, post, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

// PUT request with authorization
export const putDataAPI = async (
  url: Url,
  post: PostData,
  token: Token
): Promise<ApiResponse> => {
  const res = await axios.put(`${server}/api/v1/${url}`, post, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

// PATCH request with authorization
export const patchDataAPI = async (
  url: Url,
  post: PostData,
  token: Token
): Promise<ApiResponse> => {
  const res = await axios.patch(`${server}/api/v1/${url}`, post, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

// DELETE request with authorization
export const deleteDataAPI = async (
  url: Url,
  token: Token
): Promise<ApiResponse> => {
  const res = await axios.delete(`${server}/api/v1/${url}`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

// Auth API Login Register Logout
export const AuthApi = async (
  url: Url,
  post: PostData
): Promise<ApiResponse> => {

  const res = await axios.post(`${server}/api/${url}`, post, {
    withCredentials: true,
  });
  return res;
};

// Refresh token API
export const refreshApi = async (): Promise<ApiResponse> => {
  const res = await axios.get(`${server}/api/refresh-token`, {
    withCredentials: true,
  });
  return res;
};

// Multipart upload
export const postMultiPartDataAPI = async (
  url: Url,
  post: FormData,
  token: Token
): Promise<ApiResponse> => {
  const res = await axios.post(`${server}/api/v1/${url}`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const putMultiPartDataAPI = async (
  url: Url,
  post: FormData,
  token: Token
): Promise<ApiResponse> => {
  const res = await axios.put(`${server}/api/v1/${url}`, post, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
