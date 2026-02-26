import axios from "axios";

export const api = axios.create({
  baseURL: "https://69a045bc3188b0b1d5384086.mockapi.io/foodhaven",
});