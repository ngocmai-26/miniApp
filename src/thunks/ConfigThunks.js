import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAllConfig } from "../slices/ConfigSlice";
import { API, getToken } from "../constants/api";

export const getAllConfigs = createAsyncThunk(
    '/configs',
    async (_, { dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/personal-app-func`, {
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
        console.log("dataJson.data", dataJson.data)
        dispatch(setAllConfig(dataJson.data))
      } catch (e) {
        console.log(e)
      }
    },
  )
export const getShowDisable = createAsyncThunk(
    '/configs',
    async (id, { dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/personal-app-func/${id}/show-in-home/disable`, {
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
        dispatch(getAllConfigs())
      } catch (e) {
        console.log(e)
      }
    },
  )
export const getShowEnable = createAsyncThunk(
    '/configs',
    async (id, { dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/personal-app-func/${id}/show-in-home/enable`, {
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
        dispatch(getAllConfigs())
      } catch (e) {
        console.log(e)
      }
    },
  )
  