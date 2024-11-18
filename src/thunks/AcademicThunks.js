import { createAsyncThunk } from "@reduxjs/toolkit"
import { setAllAcademic } from "../slices/AcademicSlide"
import { API, getToken } from "../constants/api"

export const getAllAcademic = createAsyncThunk(
    '/academic',
    async (_, { dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/backoffice/academic-levels`, {
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
        dispatch(setAllAcademic(dataJson.data))
      } catch (e) {
        console.log(e)
      }
    },
  )