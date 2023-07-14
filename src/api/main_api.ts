import axios from 'axios';

export const baseURL = "https://nguyenshomefurniture-be.onrender.com/api";
// export const baseURL = "http://localhost:5000/api";

export const mainApi = axios.create({
    // baseURL: "http://localhost:5000/api",
    // baseURL : "https://nguyenshomefurniture-be.onrender.com/api",
    baseURL: baseURL,
});

