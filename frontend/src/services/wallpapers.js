/**
 *
 * functions for performing CRUD operations
 * on wallpapers using the API
 *
 */

import axios from "axios";
const BASE_URL = "/api/wallpapers";

// only url is required
export const createWallpaper = async (url, desc) => {
  const wallpaper = desc ? { url, desc } : { url };
  return await axios.post(BASE_URL, wallpaper);
};

export const getWallpapers = async () => {
  return await axios.get(BASE_URL);
};

export const getWallpaper = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`);
};

// url or desc can be undefined, but not both
// in any case, a bad req will just throw an error you can catch
export const updateWallpaper = async (id, url, desc) => {
  return await axios.put(`${BASE_URL}/${id}`, { url, desc });
};

export const deleteWallpaper = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}`);
};