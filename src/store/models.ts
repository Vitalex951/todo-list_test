import { RootState } from "./store.ts";

export interface ThunkExtraArg {
    api: any
}

export interface ThunkConfig<T> {
    rejectValue: T
    state: RootState
    extra: ThunkExtraArg
}