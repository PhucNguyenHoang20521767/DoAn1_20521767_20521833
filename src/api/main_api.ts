import axios from "axios";

export const hostURL = "https://nguyenshomefurniture-be.onrender.com";
export const baseURL = "https://nguyenshomefurniture-be.onrender.com/api";

export const mainApi = axios.create({
  baseURL: baseURL,
});
