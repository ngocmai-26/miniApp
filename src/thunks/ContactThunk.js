import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, getToken } from "../constants/api";
import { setAllContact } from "../slices/ContactSlide";

export const getAllContact = createAsyncThunk(
    '/contact',
    async (_, { dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/contacts`, {
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
        dispatch(setAllContact(dataJson.data))
      } catch (e) {
        console.log(e)
      }
    },
  )
  