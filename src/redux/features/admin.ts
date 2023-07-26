import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface adminProp {
    adminState: boolean;
    adminPermission: any;
}

const initialState: adminProp = { adminState: false, adminPermission: {} };

export const adminSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        changeAdminStatus: (state, action: PayloadAction<boolean>) => {
            state.adminState = action.payload;
        },
        updateAdminPermission: (state, action: PayloadAction) => {
            state.adminPermission = action;
        },
    },
});

export const { changeAdminStatus, updateAdminPermission } = adminSlice.actions;
export const selectAdmin = (state: RootState) => state.admin.adminState;
export const selectPermission = (state: RootState) =>
    state.admin.adminPermission;
export default adminSlice.reducer;
