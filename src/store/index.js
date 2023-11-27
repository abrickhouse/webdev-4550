import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "../profile/ProfileReducer";

const store = configureStore({
  reducer: {
    profile: ProfileReducer,
  },
});

export default store;
