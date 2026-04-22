import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/store/auth-slice";
import { subdomainsReducer } from "@/store/subdomains-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subdomains: subdomainsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
