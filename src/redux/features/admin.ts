import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type TpermissionProps = {
    //0-NoPermission / 1-WriteOnly / 2-ReadOnly / 3-ALL
    dashboard: 0 | 1 | 2 | 3;
    clients: 0 | 1 | 2 | 3;
    orders: 0 | 1 | 2 | 3;
    employees: 0 | 1 | 2 | 3;
    management: 0 | 1 | 2 | 3;
};

type TadminProps = {
    adminState: {
        loginState: boolean;
        permissionState: TpermissionProps;
    };
};

const initialState: TadminProps = {
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
        updateAdminStatus: (state, action: PayloadAction<TpermissionProps>) => {
            console.log("=> redux store update: admin state");
            // these code has something wrong that blocks db page to render on the 1st time
            if (action.payload != null) {
                console.log("-> render teset 1");
                state.adminState.loginState = true;
                console.log("-> render teset 2");
                state.adminState.permissionState = { ...action.payload };
                console.log("-> render teset 3");
            }
        },
    },
});

export const { updateAdminStatus } = adminSlice.actions;
export const selectAdmin = (state: RootState) => state.admin.adminState;
export default adminSlice.reducer;
