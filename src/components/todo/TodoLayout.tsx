import { ITodo } from "../../gateways/models/todo.ts";
import { TodoEditor } from "./TodoEditor/TodoEditor.tsx";
import { Todo } from "./Todo/Todo.tsx";
import { useCallback, useState } from "react";
import { updateTodo } from "../../store/service/updateTodo.ts";
import { deleteTodo } from "../../store/service/deleteTodo.ts";
import { useAppDispatch } from "../../store/config/store.ts";

interface TodoProps {
    todo: ITodo
    disabled: boolean
}

export const TodoLayout = ( props: TodoProps ) => {
    const dispatch = useAppDispatch()

    const {
        disabled,
        todo,
    } = props

    const [isTodoEditor, setIsTodoEditor] = useState( false )

    const onClickIsTodoEditor = () => {
        setIsTodoEditor( prev => !prev )
    }

    const onChangeTodo = useCallback( ( todo: ITodo ) => {
        dispatch( updateTodo( todo ) )
        setIsTodoEditor(false)
    }, [] )

    const onDeleteTodoHandler = useCallback( ( todoId: number ) => {
        dispatch( deleteTodo( todoId ) )
    }, [] )


    return ( <>
          { isTodoEditor
            ?
            <TodoEditor onClickSave={onChangeTodo} disabled={ disabled } todo={ todo }/>
            :
            <Todo onClickEditTask={onClickIsTodoEditor} disabled={ disabled } onDelete={ onDeleteTodoHandler } todo={ todo }/> }
      </>

    );
};
