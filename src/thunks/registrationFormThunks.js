import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAllRegistrationForm } from "../slices/registrationFormSlice";
import { getStorage } from "zmp-sdk/apis"; // Import necessary function from zmp-sdk/apis
import { API, getToken} from "../constants/api";

export const getRegistrationForm = createAsyncThunk(
  '/registration-form',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const TOKEN_APP = getToken(); 
      const resp = await fetch(`${API.uri}/miniapp/init/registration-form`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_APP}`,
        },
      });
      
      if (!resp.ok) {
        const error = await resp.text();
        throw new Error(error);
      }
      
      const dataJson = await resp.json();
      dispatch(setAllRegistrationForm(dataJson.data));
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Function to get value by key from storage using zmp-sdk/apis
const getValueByKey = async (key) => {
  return new Promise((resolve, reject) => {
    getStorage({
      keys: [key],
      success: (data) => resolve(data[key]),
      fail: (error) => reject(error),
    });
  });
};
