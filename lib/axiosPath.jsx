import axios from "axios";

const axiosPath = axios.create({
    baseURL:'http://localhost:8000',
    withCredentials:true,
})

export default axiosPath;