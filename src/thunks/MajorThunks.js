import { createAsyncThunk } from "@reduxjs/toolkit"
import { API,  getToken } from "../constants/api"
import { setAllMajors, setAllMajorsTable } from "../slices/MajorSlice"

export const getAllMajor = createAsyncThunk(
    '/major',
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/academic-levels/${data.id}/majors?training_location=${data.location}`, {
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
        dispatch(setAllMajors(dataJson.data))
      } catch (e) {
        console.log(e)
      }
    },
  )
  

  export const getAllMajorTable  = createAsyncThunk(
    '/major-table',
    async (id, { dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/majors`, {
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
        dispatch(setAllMajorsTable(dataJson.data))
      } catch (e) {
        console.log(e)
      }
    },
  )
  