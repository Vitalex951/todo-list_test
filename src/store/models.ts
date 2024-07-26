import { RootState } from "./store.ts";
import { AxiosInstance } from "axios";

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T
    state: RootState
    extra: ThunkExtraArg
}