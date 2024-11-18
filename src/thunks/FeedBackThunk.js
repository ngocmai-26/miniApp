import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, getToken } from "../constants/api";
import { setAllFeedback, setStatus } from "../slices/FeedBackSlide";
import { setAlert } from "../slices/AlertSlice";
import { TOAST_ERROR } from "../constants/toast";

export const getAllFeedback = createAsyncThunk(
    '/feedback',
    async (id, { dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/init/feedback-form`, {
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
        dispatch(setAllFeedback(dataJson.data))
      } catch (e) {
        console.log(e)
      }
    },
  )
  

  export const feedback = createAsyncThunk(
    'feedback',
    async (data, { dispatch, rejectWithValue }) => {
      try {
        
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/feedbacks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN_APP}`,
          },
          body: JSON.stringify(data),
        })
        const dataJson = await resp.json()
        if (resp.status >= 200 && resp.status < 300) {
          dispatch(setStatus(true))
        } else {
          dispatch(
            setAlert({
              type: TOAST_ERROR,
              content: "Kiểm tra lại dữ liệu",
            }),
          )
        }
      } catch (e) {
        console.log(e)
      }
    },
  )
  