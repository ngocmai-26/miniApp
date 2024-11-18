import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allNotification: [],
  searchNotification: [],
  singleNotification: {},
  errors: {},
}
const NotificationSlice = createSlice({
  name: 'Notification',
  initialState: initState,
  reducers: {
    setAllNotification: (state, { payload }) => {
      state.allNotification = payload
    },
    setSearchNotification: (state, { payload }) => {
      state.searchNotification = payload
    },
    setSingleNotification: (state, { payload }) => {
      state.singleNotification = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
  },
})

export const {
  setAllNotification,
  setSearchNotification,
  setSingleNotification,
  setErrors,
} = NotificationSlice.actions

export default NotificationSlice.reducer
