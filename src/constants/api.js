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
  return "WiA7RFh58aI3nejg-iSkHOVDYcZrq7y0rRdRRjJ8Eq3Hjfam-zfdVS23kH_JyKneqPYv6lpwGNFkZUCSoeSSIkxVnW3sbY8WzvNZVl3H7o7NbFb0_jOn7zASadBXot0ptiZOUlkg9Wc7r8DvWu9sAedfYqM9wdbejfAw9QZCGdgvbO0tbD9uMPMst3UmwpuRihtNNBN9CYMyc-jOnUqB3Tkrg53OnL8TzAoBG-ZNQIlNkvPB-V5qPe2Gfp-HsbH-W9kCCeFXHLsxXUmAmO859EFhp0JHimnB_TVR2eMbA5k9pFOhiwfHNvpBYdA5oNuZcSAeRRomSGsI-vXMeujSTgNwg2FOhMT8egw0DjhwMqBY-_yH_8SMOllOzrU5dIWc_TpNQTAB9KViyi5jzPje9yVaZddyl58CIpEG6FtV9KS"
};

  export const TOKEN = "bDK_0nHz4HsLqJC557yT797QCWSRQ4nTvRyH1c9cMM23jmfsHM5WQfIwEG1m4a0UclqBGte7U02Ox5fMIJCLFzV3F2ad64XseVnb26Cl6cw_Wp8pGsLVVfEgV1L5UJ5ocQTuP19z0dZrbIm00c1kTeUUJ6vPJpmQivnaS79FC1VscnzSD69fHS-xC58TJmO8vxaaH3b6Hpsvi0zaQ1nSURpL531Y3bP6dUPwBKGTE36RwMnm4H8RAj6yCa88P1uWmyrAMqacEKNEw6yvBH07SjJKA38N8bbnt8ui2o0g1K_AqIapBoPhHVx3NH4S5IrQtzXR5ZagSbx8Zoyf8Ny7DjgiSbTG7ICjhxaEOYv7PYxMhXjQ0756Dil04b8JALiUmkOrPXCtOnlem39Z2ZTj1j75CsH3ORES6ouJPnOU"
