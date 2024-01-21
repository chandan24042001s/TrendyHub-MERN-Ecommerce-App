import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    recent:null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser:(state,action)=>{
        state.recent=action.payload
    },
    removeUser:(state,action)=>{
      state.recent=null
    }
  }
});

export const {addUser,removeUser} = userSlice.actions

export default userSlice.reducer