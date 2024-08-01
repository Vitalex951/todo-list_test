import { classNames } from "../../shared/utils/classNames/classNames.ts";
import { ChangeEvent } from "react";

interface InputProps {
    className?: string
    value?: string
    onChange?: ( value: string ) => void
    placeholder?: string
}

export const TextArea = ( props: InputProps ) => {
    const {
        onChange,
        className,
        placeholder,
        value
    } = props

    const onChangeHandler = ( e: ChangeEvent<HTMLTextAreaElement> ) => {
        onChange?.( e.target.value )
    }

    return (
      <textarea
        rows={ 4 }
        value={ value }
        placeholder={ placeholder }
        onChange={ onChangeHandler }
        className={ classNames( 'w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-600 text-xs', {}, [className] ) }
      />
    );
};
