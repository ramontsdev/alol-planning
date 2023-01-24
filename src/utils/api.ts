import axios from "axios";
import { env } from "./environment";

export const api = axios.create({
  baseURL: env.apiUrl
})
