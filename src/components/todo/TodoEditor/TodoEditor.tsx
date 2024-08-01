import styles from '../Todo.module.scss';
import { ITodo } from "../../../gateways/models/todo.ts";
import { classNames } from "../../../shared/utils/classNames/classNames.ts";
import { useState } from "react";
import DatePicker from "react-widgets/DatePicker";
import { Input } from "../../Input/Input.tsx";
import { TextArea } from "../../TextArea/TextArea.tsx";
import { Button } from "../../Button/Button.tsx";

interface TodoProps {
    todo: ITodo,
    disabled: boolean
    onClickSave?: ( todo: ITodo ) => void
}

export const TodoEditor = ( props: TodoProps ) => {
    const {
        todo,
        onClickSave,
        disabled
    } = props

    const {
        title,
        description,
        date,
        id
    } = todo
    const [titleValue, setTitleValue] = useState( title ?? '' )
    const [descriptionValue, setDescriptionValue] = useState( description ?? '' )
    const [dateValue, setDateValue] = useState( date?  new Date(date) : new Date() )

    const onChangeTitle = ( value: string ) => {
        setTitleValue( value )
    }
    const onChangeDescription = ( value: string ) => {
        setDescriptionValue( value )
    }
    const onChangeDate = ( date: Date ) => {
        setDateValue( date )
    }

    const onClickSaveHandler = () => {
        const newTodo: ITodo = {
            title: titleValue,
            description: descriptionValue,
            id,
            date: dateValue
        }
        onClickSave?.( newTodo )
    }

    const isDisabledButtonOnSave = !titleValue || !descriptionValue || !dateValue
    console.log('dateValue', dateValue)
    console.log('dateValue', )
    return (
      <>
          <div
            className={ classNames( styles.wrapper, {}, ['flex flex-col max-w-52 p-2.5 gap-1.5 w-48 justify-between'] ) }>
              <Input placeholder={ 'Введите название' } value={ titleValue }
                     onChange={ onChangeTitle }/>
              <TextArea placeholder={ 'Введите описание' } value={ descriptionValue }
                        onChange={ onChangeDescription }/>
              <DatePicker onChange={ onChangeDate } defaultValue={ dateValue } placeholder="m/dd/yy"/>

              <Button
                disabled={ isDisabledButtonOnSave || disabled } onClick={ onClickSaveHandler }
                text={ 'Сохранить' }
              />
          </div>
      </>
    );
};
