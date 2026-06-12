import axios from 'axios';
import { toast } from 'react-toastify';


export const notify = (msg, flag) => toast(msg, { type: flag ? "success" : "error" });

const axiosinstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:7000", 
    withCredentials: true
});

export function slugCreate(value) {
    const slug = value
        .toLowerCase()
        .trim()
        .replace(/\s+/g , '-')
    return slug
}


export default axiosinstance;