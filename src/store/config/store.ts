import { configureStore } from "@reduxjs/toolkit";
import { ThunkExtraArg } from "../models.ts";
import { useDispatch, useSelector } from "react-redux";
import { $api } from "../../api/api.ts";
import { todosPageReducer } from "../slice/todosSlice.ts";

export type RootState = ReturnType<typeof store.getState>;

const extraArg: ThunkExtraArg = {
    api: $api
};

export const store = configureStore( {
    reducer: {
        todosPage: todosPageReducer
    },
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware( {
        thunk: {
            extraArgument: extraArg
        },
    } ),
} )

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>()

