import { getAccessToken } from "zmp-sdk";

export const API = {
    uri: "https://cds.bdu.edu.vn/apis",
  };
  
  export const API_KEY_NAME = "auth_token";
  export const AUTH_KEY_NAME = "auth_info";
  export const fetchAccessToken = async () => {
    try {
      const accessToken = await new Promise((resolve, reject) => {
        getAccessToken({
          success: (token) => {
            resolve(token)
          },
          fail: (error) => reject(error),
        });
      });
  
      return accessToken;  
  
    } catch (error) {
   
      return null; 
    }
  };


// tokenService.js
let accessToken = null;

export const initToken = async () => {
  try {
    accessToken = await new Promise((resolve, reject) => {
      getAccessToken({
        success: (token) => {
          resolve(token);
        },
        fail: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Failed to initialize access token:', error);
  }
};

export const getToken = () => {
  return "_3F2EQlTRppzDyu_gzzZFVayppsao1eniM7KDQtfVs-iMOzefiHT0gzryGMDnYrHW7hSF8Ni24oKUS1BeVDg985bYYEfzbbWg1lv4g288n6s8PP9iuXQFOGDZ4AKeIG5YKdh0fIh86B09VLWxRSh7EWWmntsk105sWUzKfEkR1QW5On7hQWc184vZ7oHf5yGeGcnV_tZPo7DLRaYdzSM99vIvcEnyKfxWNwQ5jVEKKttJhjCm_KR5TPmkqxyqcWZpt6HUPBFE1-VKUKTZBefPe8HmpQJdciweIQrVOl4LmETQQbphVPbBR5Olskwi58uxbwINy3hIIpJNQikyyzsIg8Zsn2gomjlj5JqRhsyNnwUFuDQluzT6uWjgr_KbM0iYNkxU8NuRmInM8q4ez8iLuP2moYkyoClSKzasfWrhCTeFm"
};

