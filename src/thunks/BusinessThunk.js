import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, getToken } from "../constants/api";
import { setAllBusiness } from "../slices/BusinessSlice";

export const getAllBusinesses = createAsyncThunk(
    '/business',
    async (_, { dispatch, rejectWithValue }) => {
      try {
        
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/business-recruiments`, {
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
        dispatch(setAllBusiness(dataJson.data))
      } catch (e) {
        console.log(e)
      }
    },
  )
  