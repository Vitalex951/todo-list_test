import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITodo } from "../../gateways/models/todo.ts";
import { ThunkConfig } from "../models.ts";

export const deleteTodo = createAsyncThunk<
  ITodo[],
  number,
  ThunkConfig<string>
>(
  'todosSlice/deleteTodo',
  async (todoId, thunkAPI) => {
      const {extra, rejectWithValue} = thunkAPI;
      try {
          const response = await extra.api.delete(`/todos/${todoId}`)
          console.log('deleteTodo', response)
          if (!response) {
              throw new Error();
          }
          return  response.data;
      } catch (e) {
          return rejectWithValue('Произошла ошибка при попытке удалить задачу');
      }
  },
);
