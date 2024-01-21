import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    recent:null,
    price:null,
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
    },
    priceUser:(state,action)=>{
      state.price=action.payload
    }
  }
});

export const {addUser,removeUser,priceUser} = userSlice.actions

export default userSlice.reducer