import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../gateways/models/todo.ts";
import { fetchTodos } from "../service/fetchTodos.ts";
import { TodosSchema } from "./types/todosSchema.ts";

const initialState: TodosSchema = {
    todosDate: undefined,
    isLoading: true,
    error: null,
};

export const todosPageSlice = createSlice({
    name: 'todosSlice',
    initialState,
    reducers: {
        setTodos(state, action: PayloadAction<ITodo[]>) {
            state.todosDate = action.payload
        },
        deleteTodo(state, action: PayloadAction<ITodo[]>) {
            state.todosDate = action.payload
        },
        updateTodo(state, action: PayloadAction<ITodo>) {
            state.todosDate = state.todosDate.map(item => item.id === action.payload.id ? action.payload : item)
        },
        createTodo(state, action: PayloadAction<ITodo>) {
            state.todosDate = [ ...state.todosDate, action.payload ]
        },

        //очистка данных
        clearData(state) {
            state.linkedProducts = undefined
            state.comparingProducts = undefined
            state.product = undefined
            state.error = null
            state.isLoading = true
        },

        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
          // получение всех задач
          .addCase(fetchTodos.pending, (state: TodosSchema) => {
              state.isLoading = true;
              state.error = null;
          })
          .addCase(fetchTodos.fulfilled, (state: TodosSchema, action: PayloadAction<ITodo[]>) => {
              state.isLoading = false;
              state.todosDate = action.payload;
          })
          .addCase(fetchTodos.rejected, (state: TodosSchema, action) => {
              state.isLoading = false;
              state.error = action.payload || null;
          })

    },
})

export const { actions: todosPageActions } = todosPageSlice;
export const { reducer: todosPageReducer } = todosPageSlice;