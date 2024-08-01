import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITodo } from "../../gateways/models/todo.ts";
import { ThunkConfig } from "../models.ts";

export const createTodo = createAsyncThunk<
  ITodo,
  ITodo,
  ThunkConfig<string>
>(
  'todosSlice/createTodo',
  async (todo, thunkAPI) => {
      const {extra, rejectWithValue} = thunkAPI;
      try {
          const response = await extra.api.post('/todos', todo)
          console.log('createTodo', response)
          if (!response) {
              throw new Error();
          }
          return response.data;
      } catch (e) {
          return rejectWithValue('Произошла ошибка при попытке создать задачу');
      }
  },
);
