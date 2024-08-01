import { useAppDispatch } from "../../store/config/store.ts";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { isLoadingTodosSelector, todosSelector } from "../../store/selectors/todos.ts";
import { fetchTodos } from "../../store/service/fetchTodos.ts";
import { Loader } from "../../components/Loader/Loader.tsx";
import { Todo } from "../../components/todo/Todo.tsx";

export const TodosPage = () => {
    const dispatch = useAppDispatch()

    const todos = useSelector( todosSelector )
    const isLoading = useSelector( isLoadingTodosSelector )
    const error = useSelector( todosSelector )

    useEffect( () => {
        dispatch( fetchTodos() )
    }, [] )

    console.log( 'todos', todos )

    if ( isLoading ) {
        return <div className="flex items-center justify-center h-screen">
            <Loader/>
        </div>
    }

    const shouldRenderTodos = !!todos && todos.length > 0
    return (
      <div className='flex gap-2.5 p-4 flex-wrap'>
          {shouldRenderTodos && todos?.map( td => <Todo key={td.id} todo={td}/> )}
      </div>
    );
};
