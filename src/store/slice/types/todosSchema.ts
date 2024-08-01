import { ITodo } from "../../../gateways/models/todo.ts";

export interface TodosSchema {
    todosDate: ITodo[] | undefined;
    isMainLoading: boolean;
    isLoading: boolean;
    error: string | null;
}
