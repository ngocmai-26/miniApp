import { createAsyncThunk } from "@reduxjs/toolkit"
import { API, getToken,  } from "../constants/api"
import { setStatus } from "../slices/AdmissionRegisterSlice"


export const admissionRegister = createAsyncThunk(
    'admission-register',
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const TOKEN_APP = getToken(); 
        const resp = await fetch(`${API.uri}/miniapp/admission-registration`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN_APP}`,
          },
          body: JSON.stringify(data),
        })
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
  