import { RootState } from "../store.ts";

const todosPageSelector = (state: RootState) => state.todosPage;

export const todos = (state: RootState) => todosPageSelector(state).todosDate;
export const isLoadingTodos = (state: RootState) => todosPageSelector(state).isLoading;
export const errorTodos = (state: RootState) => todosPageSelector(state).error;