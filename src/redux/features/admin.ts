import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface permissionProp {
    //0-NoPermission / 1-WriteOnly / 2-ReadOnly / 3-ALL
    dashboard: 0 | 1 | 2 | 3;
    clients: 0 | 1 | 2 | 3;
    orders: 0 | 1 | 2 | 3;
    employees: 0 | 1 | 2 | 3;
    management: 0 | 1 | 2 | 3;
}

interface adminProp {
    adminState: {
        loginState: boolean;
        permissionState: permissionProp;
    };
}

const initialState: adminProp = {
    adminState: {
        loginState: false,
        permissionState: {
            dashboard: 0,
            clients: 0,
            orders: 0,
            employees: 0,
            management: 0,
        },
    },
};

export const adminSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        updateAdminStatus: (state, action: PayloadAction<permissionProp>) => {
            console.log("=> redux store update: admin state");
            if (action.payload != null) {
                state.adminState.loginState = true;
                state.adminState.permissionState = { ...action.payload };
            }
        },
    },
});

export const { updateAdminStatus } = adminSlice.actions;
export const selectAdmin = (state: RootState) => state.admin.adminState;
export default adminSlice.reducer;
