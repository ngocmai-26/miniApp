import { setStorage, getStorage, removeStorage } from "zmp-sdk/apis";
import { API_KEY_NAME, AUTH_KEY_NAME } from "../constants/api";

export const loadTokenFromStorage = async () => await getValueByKey(API_KEY_NAME);
export const removeTokenFromStorage = async () => await removeWithKey(API_KEY_NAME);
export const loadAuthInfoFromStorage = async () => await getValueByKey(AUTH_KEY_NAME);
export const removeAuthInfoFromStorage = async () => await removeWithKey(AUTH_KEY_NAME);
export const setToken = async (token) => await setValueWithKey(API_KEY_NAME, token);
export const setAuthInfo = async (info) => await setValueWithKey(AUTH_KEY_NAME, info);

const getValueByKey = async (key) => {
  return new Promise((resolve, reject) => {
    getStorage({
      keys: [key],
      success: (data) => resolve(data[key]),
      fail: (error) => reject(error),
    });
  });
};

const setValueWithKey = async (key, value) => {
  return new Promise((resolve, reject) => {
    setStorage({
      data: { [key]: value },
      success: () => resolve(),
      fail: (error) => reject(error),
    });
  });
};

const removeWithKey = async (key) => {
  return new Promise((resolve, reject) => {
    removeStorage({
      keys: [key],
      success: () => resolve(),
      fail: (error) => reject(error),
    });
  });
};

export const dataToBase64 = (data) => {
  return btoa(JSON.stringify(data));
};

export const base64ToData = (base64Str) => {
  return JSON.parse(atob(base64Str));
};

export const delaySync = async (seconds) => {
  await new Promise((res) => setTimeout(() => res(), seconds * 1000));
};
