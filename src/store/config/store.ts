import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ThunkExtraArg } from "../models.ts";
import { useDispatch } from "react-redux";
import { $api } from "../../api/api.ts";
import { todosPageReducer } from "../slice/todosSlice.ts";

export const rootReducer = combineReducers({
    todosPage: todosPageReducer
});

export type RootState = ReturnType<typeof rootReducer>;
const preloadedState: Partial<RootState> = {};


const extraArg: ThunkExtraArg = {
    api: $api
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: extraArg
        },
    }),
})

export type AppDispatch = ReturnType<typeof store>['dispatch']
export const useAppDispatch = () => useDispatch<AppDispatch>();