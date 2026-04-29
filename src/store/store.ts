import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/store/auth-slice";
import { settingsReducer } from "@/store/settings-slice";
import { subdomainsReducer } from "@/store/subdomains-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subdomains: subdomainsReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
