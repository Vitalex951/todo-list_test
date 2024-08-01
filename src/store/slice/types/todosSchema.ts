import { ITodo } from "../../../gateways/models/todo.ts";

export interface TodosSchema {
    todosDate: ITodo[] | undefined;
    isLoading: boolean;
    error: string | null;
}
