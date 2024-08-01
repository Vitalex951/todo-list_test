import { RootState } from "../config/store.ts";

const todosPageSelector = (state: RootState) => state.todosPage;

export const todosSelector = (state: RootState) => todosPageSelector(state).todosDate;
export const isLoadingTodosSelector = (state: RootState) => todosPageSelector(state).isLoading;
export const errorTodosSelector = (state: RootState) => todosPageSelector(state).error;