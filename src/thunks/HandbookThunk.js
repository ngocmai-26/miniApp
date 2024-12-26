import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, getToken } from "../constants/api";
import { setAllHandbook } from "../slices/HandbookSlide";

export const getAllHandbook = createAsyncThunk(
    '/handbook',
    async (_, { dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/handbooks`, {
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
        dispatch(setAllHandbook(dataJson.data))
      } catch (e) {
        console.log(e)
      }
    },
  )
  