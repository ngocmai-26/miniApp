import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allMedia: [],
  searchMedia: [],
  singleMedia: {},
  paginationMedia: {},
  errors: {},
}
const MediasSlice = createSlice({
  name: 'Media',
  initialState: initState,
  reducers: {
    setAllMedia: (state, { payload }) => {
      state.allMedia = payload
    },
    setSearchMedia: (state, { payload }) => {
      state.searchMedia = payload
    },
    setSingleMedia: (state, { payload }) => {
      state.singleMedia = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationMedia: (state, { payload }) => {
      state.paginationMedia = payload
    },
  },
})

export const {
  setAllMedia,
  setSearchMedia,
  setSingleMedia,
  setErrors,
  setPaginationMedia
} = MediasSlice.actions

export default MediasSlice.reducer
