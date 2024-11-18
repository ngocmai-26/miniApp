import { createAsyncThunk } from "@reduxjs/toolkit"
import { API, getToken} from "../constants/api"
import { setAllCollegeExamGroups } from "../slices/CollegeExamGroupSlice"

export const getAllCollegeExamGroup = createAsyncThunk(
    '/college-exam-group',
    async (id, { dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/majors/${id}/college-exam-groups`, {
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
        dispatch(setAllCollegeExamGroups(dataJson.data))
      } catch (e) {
        console.log(e)
      }
    },
  )
  