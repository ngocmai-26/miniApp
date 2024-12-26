import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allContact: [],
  searchContact: [],
  singleContact: {},
  paginationContact: {},
  errors: {},
}
const ContactSlice = createSlice({
  name: 'Contact',
  initialState: initState,
  reducers: {
    setAllContact: (state, { payload }) => {
      state.allContact = payload
    },
    setSearchContact: (state, { payload }) => {
      state.searchContact = payload
    },
    setSingleContact: (state, { payload }) => {
      state.singleContact = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationContact: (state, { payload }) => {
      state.paginationContact = payload
    },
  },
})

export const {
  setAllContact,
  setSearchContact,
  setSingleContact,
  setErrors,
  setPaginationContact
} = ContactSlice.actions

export default ContactSlice.reducer
