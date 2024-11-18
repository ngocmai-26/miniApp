import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allMajors: [],
  allMajorsTable: [],
  searchMajors: [],
  singleMajors: {},
  paginationMajors: {},
  errors: {},
}
const MajorSlice = createSlice({
  name: 'major',
  initialState: initState,
  reducers: {
    setAllMajors: (state, { payload }) => {
      state.allMajors = payload
    },
    setAllMajorsTable: (state, { payload }) => {
      state.allMajorsTable = payload
    },
    setSearchMajors: (state, { payload }) => {
      state.searchMajors = payload
    },
    setSingleMajors: (state, { payload }) => {
      state.singleMajors = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationMajors: (state, { payload }) => {
      state.paginationMajors = payload
    },
  },
})

export const {
  setAllMajors,
  setSearchMajors,
  setSingleMajors,
  setErrors,
  setPaginationMajors,
  setAllMajorsTable
} = MajorSlice.actions

export default MajorSlice.reducer
