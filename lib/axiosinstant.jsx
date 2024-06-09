import axios from "axios";

export const axiosinstant = axios.create({
    // baseURL:'https://agenda-backend-a2ufeas42-champs-projects-2393d9b1.vercel.app/',
    baseURL:'http://localhost:8000/',
    withCredentials:true,
})