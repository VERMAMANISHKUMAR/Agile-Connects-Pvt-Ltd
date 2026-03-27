import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

export const addData = async (data) => {
  const res = await axios.post(`${API_URL}/data`, data);
  return res.data;
};