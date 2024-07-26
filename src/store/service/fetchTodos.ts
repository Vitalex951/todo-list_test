import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITodo } from "../../gateways/models/todo.ts";
import { ThunkConfig } from "../models.ts";

export const fetchTodos = createAsyncThunk<
  ITodo[],
  never,
  ThunkConfig<string>
>(
  'todosSlice/fetchTodos',
  async (_, thunkAPI) => {
      const { extra, rejectWithValue } = thunkAPI;
      try {
          const response = await extra.api.get('/todos')
          console.log('fetchTodos', response)
          if (!response) {
              throw new Error();
          }
          return response.data;
      } catch ( e ) {
          return rejectWithValue('Задачи не найдены');
      }
  },
);
