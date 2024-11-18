import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, getToken } from "../constants/api";
import { setAllLocation } from "../slices/LocationSlice";

export const getAllLocation = createAsyncThunk(
    '/location',
    async (_, { dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/training-location`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN_APP}`,
          },
        })
        const dataJson = await resp.json()
        if (resp.status >= 300) {
          return rejectWithValue()
        }
        dispatch(setAllLocation(dataJson.data))
      } catch (e) {
        console.log(e)
      }
    },
  )
  