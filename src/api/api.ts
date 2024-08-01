import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { todosMock } from "../gateways/todos.data.ts";

const $api = axios.create();

const mock = new MockAdapter( $api );

// Моки запросов
mock.onGet( '/todos' ).reply( () => {
    return new Promise( ( resolve ) => {
        setTimeout( () => {
            resolve( [200, todosMock] );
        }, 1000 );
    } );
} );

mock.onPost( '/todos' ).reply( ( config ) => {
    const newTodo = JSON.parse( config.data );
    todosMock.push( newTodo );
    return new Promise( ( resolve ) => {
        setTimeout( () => {
            resolve( [201, newTodo] );
        }, 1000 );
    } );
} );

mock.onDelete( new RegExp( `/todos/\\d+` ) ).reply( ( config ) => {
    const id = parseInt( config.url!.split( '/' ).pop()!, 10 );

    const index = todosMock.findIndex( todo => todo.id === id );
    console.log('index', index)
    return new Promise( ( resolve, reject ) => {
        setTimeout( () => {
            if ( index !== -1 ) {
                todosMock.splice( index, 1 );
                resolve( [200, todosMock] )
            }
            reject( [404, { message: 'TodoLayout not found' }] )
        }, 1000 );
    } );
} );

mock.onPatch( new RegExp( `/todos` ) ).reply( ( config ) => {
    const updatedTodo = JSON.parse( config.data );
    const index = todosMock.findIndex( todo => todo.id === updatedTodo.id );
    return new Promise( ( resolve, reject ) => {
        setTimeout( () => {
            if ( index !== -1 ) {
                todosMock[index] = updatedTodo;
                resolve( [200, updatedTodo] )
            }
            reject( [404, { message: 'TodoLayout not found' }]
            )
        }, 1000 );
    } );
} );

export { $api };
