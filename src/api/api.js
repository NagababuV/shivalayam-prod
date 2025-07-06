import axios from "axios";

const API_BASE = "http://localhost:8080";

// 📦 Public APIs
export const fetchPhotos = () => axios.get(`${API_BASE}/api/photos`);
export const fetchDonations = () => axios.get(`${API_BASE}/api/donations`);
export const fetchTopDonations = () => axios.get(`${API_BASE}/api/topdonations`);
export const fetchTotal = () => axios.get(`${API_BASE}/api/donations/total`);

// 🔐 Auth APIs
export const login = (mobile, password) =>
  axios.post(`${API_BASE}/auth/login`, { mobile, password });

export const requestOtp = (mobile) =>
  axios.post(`${API_BASE}/auth/request-otp`, { mobile });

export const verifyOtp = (mobile, otp) =>
  axios.post(`${API_BASE}/auth/verify-otp`, { mobile, otp });

// 🔒 Admin-only APIs (require JWT token)
export const uploadDonation = (donorName, amount, token) =>
  axios.post(
    `${API_BASE}/api/admin/donations`,
    { donorName, amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const uploadPhoto = (file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${API_BASE}/api/admin/photos`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
