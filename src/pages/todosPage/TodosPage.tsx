import { useAppDispatch } from "../../store/config/store.ts";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    errorTodosSelector,
    isLoadingTodosSelector,
    isMainLoadingTodosSelector,
    todosSelector
} from "../../store/selectors/todos.ts";
import { fetchTodos } from "../../store/service/fetchTodos.ts";
import { Loader } from "../../components/Loader/Loader.tsx";
import { TodoLayout } from "../../components/todo/TodoLayout.tsx";
import styles from './TodosPage.module.scss'

export const TodosPage = () => {
    const dispatch = useAppDispatch()

    const todos = useSelector( todosSelector )
    const isMainLoading = useSelector( isMainLoadingTodosSelector )
    const isLoading = useSelector( isLoadingTodosSelector )
    const error = useSelector( errorTodosSelector )

    useEffect( () => {
        dispatch( fetchTodos() )
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
                /> ) ) }
          </div>
          { isLoading && <div className={ 'flex justify-center' }><Loader/></div> }
          {!!error && <div>
            <span className={styles.error}>
              {error}
            </span>
          </div>}
      </>

    );
};
