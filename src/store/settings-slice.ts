import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  domainCreationEnabled: boolean;
}

const initialState: SettingsState = {
  domainCreationEnabled: true,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setDomainCreationEnabled(state, action: PayloadAction<boolean>) {
      state.domainCreationEnabled = action.payload;
    },
  },
});

export const { setDomainCreationEnabled } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
