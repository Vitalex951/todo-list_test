import { useAppDispatch, useAppSelector } from "../../store/config/store.ts";
import { useCallback, useEffect, useState } from "react";
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
import { Button } from "../../components/Button/Button.tsx";
import { TodoEditor } from "../../components/todo/TodoEditor/TodoEditor.tsx";
import { ITodo } from "../../gateways/models/todo.ts";
import { createTodo } from "../../store/service/createTodo.ts";
import { todosPageActions } from "../../store/slice/todosSlice.ts";

const mockTodo = {
    id: 1,
    date: new Date(),
    description: '',
    title: ''
}
export const TodosPage = () => {
    const dispatch = useAppDispatch()

    const [isCreateNewTodo, setIsCreateNewTodo] = useState( false )

    const todos = useAppSelector( todosSelector )
    const isMainLoading = useAppSelector( isMainLoadingTodosSelector )
    const isLoading = useAppSelector( isLoadingTodosSelector )
    const error = useAppSelector( errorTodosSelector )

    useEffect( () => {
        dispatch( fetchTodos() )
    }, [] )

    useEffect(() => {
        let timerId = 0
        if(!!error) {
            timerId =  setTimeout(() => {
                dispatch(todosPageActions.setError(null))
            }, 3000 )
        }

        return () => {
            if(timerId) {
                clearTimeout(timerId)
            }
        }
    }, [error, todosPageActions])

    const onClickChangeIsCreateNewTodo = useCallback( () => {
        setIsCreateNewTodo( prev => !prev )
    }, [] )

    const onClickCreateNewTodo = useCallback( ( newTodo: ITodo ) => {
        dispatch( createTodo( newTodo ) )
        setIsCreateNewTodo( false )
    }, [createTodo] )

    const onClickGenerateError = useCallback(() => {
        dispatch(todosPageActions.setError('Какая-то ошибка'))
    }, [todosPageActions])

    const shouldRenderTodos = !!todos && todos.length > 0

    const textCreateTodo = isCreateNewTodo ? 'Закрыть' : 'Создать новую задачу'

    if ( isMainLoading ) {
        return <div className="flex items-center justify-center h-screen">
            <Loader/>
        </div>
    }
    return (
      <div className={ 'flex flex-col gap-4 p-4' }>
          <div className={'flex gap-4'}>
              <Button text={ textCreateTodo } onClick={ onClickChangeIsCreateNewTodo }/>
              <Button className={styles.error} text={'Сгенерировать ошибку'} onClick={onClickGenerateError} />
          </div>
          { isCreateNewTodo && <TodoEditor onClickSave={ onClickCreateNewTodo } todo={ mockTodo }
                                           disabled={ isLoading }/> }
          <div className='flex gap-2.5 flex-wrap'>
              { shouldRenderTodos && todos?.map( td => (
                <TodoLayout
                  key={ td.id }
                  disabled={ isLoading }
                  todo={ td }
                /> ) ) }
          </div>
          { isLoading && <div className={ 'flex justify-center' }><Loader/></div> }
          { !!error && <div>
            <span className={ styles.error }>
              { error }
            </span>
          </div> }
      </div>

    );
};
