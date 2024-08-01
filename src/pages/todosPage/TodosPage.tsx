import { useAppDispatch } from "../../store/config/store.ts";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    isLoadingTodosSelector,
    isMainLoadingTodosSelector,
    todosSelector
} from "../../store/selectors/todos.ts";
import { fetchTodos } from "../../store/service/fetchTodos.ts";
import { Loader } from "../../components/Loader/Loader.tsx";
import { TodoLayout } from "../../components/todo/TodoLayout.tsx";
import { ITodo } from "../../gateways/models/todo.ts";
import { updateTodo } from "../../store/service/updateTodo.ts";
import { deleteTodo } from "../../store/service/deleteTodo.ts";

export const TodosPage = () => {
    const dispatch = useAppDispatch()

    const todos = useSelector( todosSelector )
    const isMainLoading = useSelector( isMainLoadingTodosSelector )
    const isLoading = useSelector( isLoadingTodosSelector )
    const error = useSelector( todosSelector )

    useEffect( () => {
        dispatch( fetchTodos() )
    }, [] )

    const onChangeTodo = useCallback( ( todo: ITodo ) => {
        dispatch( updateTodo( todo ) )
    }, [] )

    const onDeleteTodo = useCallback( ( todoId: number ) => {
        dispatch( deleteTodo( todoId ) )
    }, [] )

    if ( isMainLoading ) {
        return <div className="flex items-center justify-center h-screen">
            <Loader/>
        </div>
    }

    const shouldRenderTodos = !!todos && todos.length > 0
    return (
      <>
          <div className='flex gap-2.5 p-4 flex-wrap'>
              { shouldRenderTodos && todos?.map( td => (
                <TodoLayout
                  key={ td.id }
                  disabled={ isLoading }
                  todo={ td }
                  onChange={ onChangeTodo }
                  onDelete={ onDeleteTodo }
                /> ) ) }
          </div>
          { isLoading && <div className={ 'flex justify-center' }><Loader/></div> }
      </>

    );
};
