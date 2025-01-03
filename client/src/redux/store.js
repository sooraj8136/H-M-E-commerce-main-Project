import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./features/darkModeSlice";
import userReducer from "./features/userSlice"
import sellerReducer from "./features/sellerSlice"
import adminReducer from './features/adminSlice'

export const store = configureStore({
  reducer: {
    mode: darkModeReducer,  
    user: userReducer,   
    seller: sellerReducer,
    admin: adminReducer
  }
})