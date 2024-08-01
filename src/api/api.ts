import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { todosMock } from "../gateways/todos.data.ts";

const $api = axios.create();

const mock = new MockAdapter($api);

// Моки запросов
mock.onGet('/todos').reply(() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([200, todosMock]);
        }, 1000);
    });
});

mock.onPost('/todos').reply((config) => {
    const newTodo = JSON.parse(config.data);
    todosMock.push(newTodo);
    return [201, newTodo];
});

mock.onDelete(new RegExp(`/todos/\\d+`)).reply((config) => {
    const id = parseInt(config.url!.split('/').pop()!, 10);
    const index = todosMock.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todosMock.splice(index, 1);
        return [200, todosMock];
    }
    return [404, { message: 'Todo not found' }];
});

mock.onPatch(new RegExp(`/todos/\\d+`)).reply((config) => {
    const updatedTodo = JSON.parse(config.data);
    const index = todosMock.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
        todosMock[index] = updatedTodo;
        return [200, updatedTodo];
    }
    return [404, { message: 'Todo not found' }];
});

export { $api };
