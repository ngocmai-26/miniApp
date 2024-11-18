import { createSlice } from "@reduxjs/toolkit"


const initState = {
  allRegistrationForm: [],
  searchRegistrationForm: [],
  singleRegistrationForm: {},
  paginationRegistrationForm: {},
  errors: {},
}
const RegistrationFormsSlice = createSlice({
  name: 'registrationForm',
  initialState: initState,
  reducers: {
    setAllRegistrationForm: (state, { payload }) => {
      state.allRegistrationForm = payload
    },
    setSearchRegistrationForm: (state, { payload }) => {
      state.searchRegistrationForm = payload
    },
    setSingleRegistrationForm: (state, { payload }) => {
      state.singleRegistrationForm = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationRegistrationForm: (state, { payload }) => {
      state.paginationRegistrationForm = payload
    },
  },
})

export const {
  setAllRegistrationForm,
  setSearchRegistrationForm,
  setSingleRegistrationForm,
  setErrors,
  setPaginationRegistrationForm
} = RegistrationFormsSlice.actions

export default RegistrationFormsSlice.reducer
