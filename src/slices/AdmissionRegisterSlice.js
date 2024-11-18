import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allAdmissionRegister: [],
  searchAdmissionRegister: [],
  singleAdmissionRegister: {},
  paginationAdmissionRegister: {},
  errors: {},
  status:''
}
const AdmissionRegistersSlice = createSlice({
  name: 'admissionRegister',
  initialState: initState,
  reducers: {
    setAllAdmissionRegister: (state, { payload }) => {
      state.allAdmissionRegister = payload
    },
    setSearchAdmissionRegister: (state, { payload }) => {
      state.searchAdmissionRegister = payload
    },
    setSingleAdmissionRegister: (state, { payload }) => {
      state.singleAdmissionRegister = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setStatus: (state, { payload }) => {
      state.status = payload
    },
    setPaginationAdmissionRegister: (state, { payload }) => {
      state.paginationAdmissionRegister = payload
    },
  },
})

export const {
  setAllAdmissionRegister,
  setSearchAdmissionRegister,
  setSingleAdmissionRegister,
  setErrors,
  setPaginationAdmissionRegister,
  setStatus
} = AdmissionRegistersSlice.actions

export default AdmissionRegistersSlice.reducer
