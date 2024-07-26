import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ThunkExtraArg } from "./models.ts";
import { useDispatch } from "react-redux";

export const rootReducer = combineReducers({});

export type RootState = ReturnType<typeof rootReducer>;

const extraArg: ThunkExtraArg = {
    api: any
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: extraArg
        }

    })
})

export type AppDispatch = ReturnType<typeof store>['dispatch']
export const useAppDispatch = () => useDispatch<AppDispatch>();