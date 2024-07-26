import { ITodo } from "./todo.ts";

/**
 * Интерфейс репозитория для получения данных для страницы задач
 */
export interface ITodoPageRepository {
    /**
     * Возвращает всех задач
     */
    getTodos(): Promise<ITodo[]>;

    /**
     * Удаление задачи по id
     */
    deleteTodo(todoId: number): Promise<ITodo[]>;

    /**
     * Редактирование задачи по id
     */
    updateTodo(todo: ITodo): Promise<ITodo>;

    /**
     * Создание новой задачи
     */
    createTodo(todo: ITodo): Promise<ITodo>;
}
