import { createSlice } from "@reduxjs/toolkit";



const requesrSlice = createSlice({
   name : "request",
   initialState : null,
   reducers : {
      addRequest : (state , action) =>{
         return action.payload
      }
   }
})

export const {addRequest} = requesrSlice.actions
export default requesrSlice.reducer
