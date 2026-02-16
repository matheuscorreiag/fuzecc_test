import { Env } from "@/env";
import axios from "axios";

export const client = axios.create({
  baseURL: Env.EXPO_PUBLIC_PANDA_SCORE_API_BASE_URL,
});

client.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Env.EXPO_PUBLIC_PANDA_SCORE_API_TOKEN}`;
  return config;
});
