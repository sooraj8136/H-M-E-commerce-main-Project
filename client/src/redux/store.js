import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./features/darkModeSlice";
import userReducer from "./features/userSlice"
import sellerReducer from "./features/sellerSlice"
import adminReducer from './features/adminSlice'

// Config store
export const store = configureStore({
  reducer: {
    mode: darkModeReducer,  //darkMode 
    user: userReducer,   //isUserAuth
    seller: sellerReducer,
    admin: adminReducer
  }
})