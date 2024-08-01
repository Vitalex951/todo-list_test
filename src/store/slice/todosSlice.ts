import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../gateways/models/todo.ts";
import { fetchTodos } from "../service/fetchTodos.ts";
import { TodosSchema } from "./types/todosSchema.ts";
import { deleteTodo } from "../service/deleteTodo.ts";
import { updateTodo } from "../service/updateTodo.ts";

const initialState: TodosSchema = {
    todosDate: undefined,
    isMainLoading: true,
    isLoading: false,
    error: null,
};

export const todosPageSlice = createSlice({
    name: 'todosSlice',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
          // получение всех задач
          .addCase(fetchTodos.pending, (state: TodosSchema) => {
              state.isMainLoading = true;
              state.error = null;
          })
          .addCase(fetchTodos.fulfilled, (state: TodosSchema, action: PayloadAction<ITodo[]>) => {
              state.isMainLoading = false;
              state.todosDate = action.payload;
          })
          .addCase(fetchTodos.rejected, (state: TodosSchema, action) => {
              state.isMainLoading = false;
              state.error = action.payload || null;
          })

          // удаление задачи
          .addCase(deleteTodo.pending, (state: TodosSchema) => {
              state.isLoading = true;
              state.error = null;
          })
          .addCase(deleteTodo.fulfilled, (state: TodosSchema, action: PayloadAction<ITodo[]>) => {
              state.isLoading = false;
              state.todosDate = action.payload;
          })
          .addCase(deleteTodo.rejected, (state: TodosSchema, action) => {
              state.isLoading = false;
              state.error = action.payload || null;
          })

          // обновление задачи
          .addCase(updateTodo.pending, (state: TodosSchema) => {
              state.isLoading = true;
              state.error = null;
          })
          .addCase(updateTodo.fulfilled, (state: TodosSchema, action: PayloadAction<ITodo>) => {
              state.isLoading = false;
              state.todosDate = state?.todosDate?.map(item => item.id === action.payload.id ? action.payload : item)
          })
          .addCase(updateTodo.rejected, (state: TodosSchema, action) => {
              state.isLoading = false;
              state.error = action.payload || null;
          })

    },
})

export const { actions: todosPageActions } = todosPageSlice;
export const { reducer: todosPageReducer } = todosPageSlice;