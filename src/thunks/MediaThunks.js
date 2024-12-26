import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, getToken } from "../constants/api";

export const createMedia  = createAsyncThunk(
    '/media',
    async (formData, { dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/media`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${TOKEN_APP}`,
          },
          body: formData,
        })
        const dataJson = await resp.json()
        if (resp.status >= 200 && resp.status < 300) {
          console.log("dataJson", dataJson)
            return rejectWithValue(dataJson)
          } 
        else {
          return rejectWithValue()
        }
      } catch (e) {
        console.log(e)
      }
    },
  )
  
  export const deleteMedia  = createAsyncThunk(
    '/delete',
    async ({ dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/media/remove`, {
          method: 'DETELE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN_APP}`,
          },
          body: JSON.stringify(data),
        })
        const dataJson = await resp.json()
        if (resp.status >= 200 && resp.status < 300) {
            return rejectWithValue(dataJson)
          } 
        else {
          return rejectWithValue()
        }
      } catch (e) {
        console.log(e)
      }
    },
  )