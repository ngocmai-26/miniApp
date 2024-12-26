import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allHandbook: [],
  searchHandbook: [],
  singleHandbook: {},
  paginationHandbook: {},
  errors: {},
}
const HandbookSlice = createSlice({
  name: 'Handbook',
  initialState: initState,
  reducers: {
    setAllHandbook: (state, { payload }) => {
      state.allHandbook = payload
    },
    setSearchHandbook: (state, { payload }) => {
      state.searchHandbook = payload
    },
    setSingleHandbook: (state, { payload }) => {
      state.singleHandbook = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationHandbook: (state, { payload }) => {
      state.paginationHandbook = payload
    },
  },
})

export const {
  setAllHandbook,
  setSearchHandbook,
  setSingleHandbook,
  setErrors,
  setPaginationHandbook
} = HandbookSlice.actions

export default HandbookSlice.reducer
