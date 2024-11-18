import { createAsyncThunk } from "@reduxjs/toolkit"
import { API, getToken} from "../constants/api"
import { setAllNews } from "../slices/NewsSlide"


export const getAllNews = createAsyncThunk(
    '/news',
    async (_, { dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/news`, {
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
        dispatch(setAllNews(dataJson.data))
      } catch (e) {
        console.log(e)
      }
    },
  )
  