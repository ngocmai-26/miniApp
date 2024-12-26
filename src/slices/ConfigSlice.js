import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allConfig: [],
  searchConfig: [],
  singleConfig: {},
  paginationConfig: {},
  errors: {},
}
const ConfigSlice = createSlice({
  name: 'config',
  initialState: initState,
  reducers: {
    setAllConfig: (state, { payload }) => {
      state.allConfig = payload
    },
    setSearchConfig: (state, { payload }) => {
      state.searchConfig = payload
    },
    setSingleConfig: (state, { payload }) => {
      state.singleConfig = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationConfig: (state, { payload }) => {
      state.paginationConfig = payload
    },
  },
})

export const {
  setAllConfig,
  setSearchConfig,
  setSingleConfig,
  setErrors,
  setPaginationConfig
} = ConfigSlice.actions

export default ConfigSlice.reducer
