import axios from "axios"

export const API_BASE_URL = "http://192.168.56.12:5455"

const api=axios.create({
    baseURL:API_BASE_URL,
    headers:{
        "Content-Type":"application/json"
    }
})

export default api
