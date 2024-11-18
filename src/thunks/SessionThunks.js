import { createAsyncThunk } from "@reduxjs/toolkit"
import { API, getToken, initToken} from "../constants/api"

export const session = createAsyncThunk(
    'session',
    async (data, { dispatch, rejectWithValue }) => {
      try {
        
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/auth/session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN_APP}`,
          },
          body: JSON.stringify({
            token: `${TOKEN_APP}`}),
        })
        
      } catch (e) {
        console.log(e)
      }
    },
  )
  