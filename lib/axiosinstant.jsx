import axios from "axios";

export const axiosinstant = axios.create({
    // baseURL:'https://agenda-backend-lake.vercel.app/',
    baseURL:'http://localhost:8000/',
    withCredentials:true,
})