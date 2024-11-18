import { createAsyncThunk } from "@reduxjs/toolkit"
import { API, getToken,  } from "../constants/api"
import { setAllEvaluation } from "../slices/EvaluationSlice"

export const getAllEvaluation = createAsyncThunk(
    '/evaluation',
    async (id, { dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/majors/${id}/evaluation-methods`, {
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
        dispatch(setAllEvaluation(dataJson.data))
      } catch (e) {
        console.log(e)
      }
    },
  )
  