import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allNews: [],
  searchNews: [],
  singleNews: {},
  paginationNews: {},
  errors: {},
}
const NewsSlice = createSlice({
  name: 'news',
  initialState: initState,
  reducers: {
    setAllNews: (state, { payload }) => {
      state.allNews = payload
    },
    setSearchNews: (state, { payload }) => {
      state.searchNews = payload
    },
    setSingleNews: (state, { payload }) => {
      state.singleNews = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationNews: (state, { payload }) => {
      state.paginationNews = payload
    },
  },
})

export const {
  setAllNews,
  setSearchNews,
  setSingleNews,
  setErrors,
  setPaginationNews
} = NewsSlice.actions

export default NewsSlice.reducer
