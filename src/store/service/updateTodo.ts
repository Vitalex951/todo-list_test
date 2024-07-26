import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITodo } from "../../gateways/models/todo.ts";
import { ThunkConfig } from "../models.ts";

export const updateTodo = createAsyncThunk<
  ITodo[],
  ITodo,
  ThunkConfig<string>
>(
  'todosSlice/updateTodo',
  async (todo, thunkAPI) => {
      const { extra, rejectWithValue } = thunkAPI;
      try {
          const response = await extra.api.patch('/todos', todo)
          console.log('updateTodo', response)
          if (!response) {
              throw new Error();
          }
          return response.data;
      } catch ( e ) {
          return rejectWithValue('Товар не найден');
      }
  },
);
