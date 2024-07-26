import { ITodoPageRepository } from "./models/todoPageRepository.ts";
import { ITodo } from "./models/todo.ts";
import { todos } from "./api.ts";

export class MockTodosGateway implements ITodoPageRepository {
    async getTodos(): Promise<ITodo[]> {
        if (todos === undefined) {
            setTimeout(() => {
                return Promise.reject(new Error('Todos not found'));
            }, 1000)
        } else {
            setTimeout(() => {
                return Promise.resolve(todos);
            }, 1000)
        }
    }

    async deleteTodo(todoId: number): Promise<ITodo[]> {
        const todo = todos.find(item => item.id === todoId)
        if (!todo) {
            setTimeout(() => {
                return Promise.reject(new Error('Todo not found'));
            }, 1000)
        } else {
            const result = todos.filter((item) => item.id !== todoId);
            setTimeout(() => {
                return Promise.resolve(result);
            }, 1000)
        }

    }

    async updateTodo(todo: ITodo): Promise<ITodo> {
        const indexTodo = todos.findIndex(item => item.id === todo.id)
        if (indexTodo === -1) {
            setTimeout(() => {
                return Promise.reject(new Error('Todo not found'));
            }, 1000)
        } else {
            todos[indexTodo] = todo
            setTimeout(() => {
                return Promise.resolve(todo);
            }, 1000)
        }
    }

    async createTodo(todo: ITodo): Promise<ITodo> {
        if (!todos) {
            setTimeout(() => {
                return Promise.reject(new Error('Todos not found'));
            }, 1000)
        } else {
            todos.push(todo)
            setTimeout(() => {
                return Promise.resolve(todos);
            }, 1000)
        }
    }
}