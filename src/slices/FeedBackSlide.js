import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allFeedback: [],
  searchFeedback: [],
  singleFeedback: {},
  paginationFeedback: {},
  errors: {},
   status:''
}
const FeedbacksSlice = createSlice({
  name: 'feedback',
  initialState: initState,
  reducers: {
    setAllFeedback: (state, { payload }) => {
      state.allFeedback = payload
    },
    setSearchFeedback: (state, { payload }) => {
      state.searchFeedback = payload
    },
    setSingleFeedback: (state, { payload }) => {
      state.singleFeedback = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationFeedback: (state, { payload }) => {
      state.paginationFeedback = payload
    },
    setStatus: (state, { payload }) => {
      state.status = payload
    },
  },
})

export const {
  setAllFeedback,
  setSearchFeedback,
  setSingleFeedback,
  setErrors,
  setPaginationFeedback,
  setStatus
} = FeedbacksSlice.actions

export default FeedbacksSlice.reducer
