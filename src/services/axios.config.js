import axios from "axios";

const URL = 'https://67edc04b4387d9117bbe874d.mockapi.io/api/stockproducts'

export const axiosInstance = axios.create({
    baseURL: URL
})