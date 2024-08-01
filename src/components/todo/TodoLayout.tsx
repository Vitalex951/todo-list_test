import { ITodo } from "../../gateways/models/todo.ts";
import { TodoEditor } from "./TodoEditor/TodoEditor.tsx";
import { Todo } from "./Todo/Todo.tsx";
import { useCallback } from "react";

interface TodoProps {
    todo: ITodo
    onDelete?: ( id: number ) => void
    onChange?: ( todo: ITodo ) => void
    isTodoEditor?: boolean
    disabled: boolean
}

export const TodoLayout = ( props: TodoProps ) => {
    const {
        todo,
        onChange,
        onDelete,
        isTodoEditor = false,
      disabled = false
    } = props

    const onChangeTodoHandler = useCallback( ( todo: ITodo ) => {
        onChange?.( todo )
    }, [onChange] )

    const onDeleteTodoHandler = useCallback( ( idTodo: number ) => {
        console.log('idTodo', idTodo)
        onDelete?.( idTodo )
    }, [onDelete] )

    const {
        title,
        description,
        date,
        id
    } = todo

    return ( <>
          { !isTodoEditor ? <Todo disabled={disabled} onDelete={onDeleteTodoHandler} todo={ todo }/> : <TodoEditor disabled={disabled} todo={ todo }/> }
      </>

    );
};
