import { createSlice } from '@reduxjs/toolkit'

const initState = {
  token_app: '',
}
const TokenAppSlice = createSlice({
  name: 'token_app',
  initialState: initState,
  reducers: {
    setTokenApp: (state, { payload }) => {
      state.token_app = payload
    },
  },
})

export const {
  setTokenApp,
} = TokenAppSlice.actions

export default TokenAppSlice.reducer
