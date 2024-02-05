import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001",
  });

export const getProducers = async () => {
    const response = await api.get("/api/producers");
    return response.data;
};