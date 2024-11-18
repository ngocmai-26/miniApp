import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAllNotification } from "../slices/NotificationSlice";
import { API, getToken } from "../constants/api";

export const getAllNotification = createAsyncThunk(
    '/notification',
    async (_, { dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/miniapp-notification`, {
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
        dispatch(setAllNotification(dataJson.data))
      } catch (e) {
        console.log(e)
      }
    },
  )
  
export const patchReadAll = createAsyncThunk(
    '/notification/read_all',
    async (_, { dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/miniapp-notification/read-all`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN_APP}`,
          },
        })
        if (resp.status >= 300) {
          return rejectWithValue()
        }
        dispatch(getAllNotification())
      } catch (e) {
        console.log(e)
      }
    },
  )
  
export const patchRead = createAsyncThunk(
    '/notification/read',
    async (id, { dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/miniapp-notification/${id}/read`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN_APP}`,
          },
        })
        if (resp.status >= 300) {
          return rejectWithValue()
        }
        dispatch(getAllNotification())
      } catch (e) {
        console.log(e)
      }
    },
  )
  