import axios from "axios";

const API_KEY = import.meta.env.VITE_MYPTV_API_KEY
const API_URL = import.meta.env.VITE_MYPTV_API_URL

export const getRouteInfo = ({ start, end }) => {
  return axios.get(`${API_URL}/routes?waypoints=${start}&waypoints=${end}`, {
    params: {
      apiKey: API_KEY
    }
  })
}
