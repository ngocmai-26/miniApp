import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allLocation: [],
  searchLocation: [],
  singleLocation: {},
  paginationLocation: {},
  errors: {},
}
const LocationSlice = createSlice({
  name: 'Location',
  initialState: initState,
  reducers: {
    setAllLocation: (state, { payload }) => {
      state.allLocation = payload
    },
    setSearchLocation: (state, { payload }) => {
      state.searchLocation = payload
    },
    setSingleLocation: (state, { payload }) => {
      state.singleLocation = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationLocation: (state, { payload }) => {
      state.paginationLocation = payload
    },
  },
})

export const {
  setAllLocation,
  setSearchLocation,
  setSingleLocation,
  setErrors,
  setPaginationLocation
} = LocationSlice.actions

export default LocationSlice.reducer
