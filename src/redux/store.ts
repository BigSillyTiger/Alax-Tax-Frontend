import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./features/admin";

const store = configureStore({
    reducer: {
        admin: adminReducer,
    },
    // disable non-serializable value check
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
