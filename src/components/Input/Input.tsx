import { classNames } from "../../shared/utils/classNames/classNames.ts";
import { ChangeEvent, memo } from "react";

interface InputProps {
    className?: string
    value?: string
    onChange?: ( value: string ) => void
    placeholder?: string
}

export const Input = memo(( props: InputProps ) => {
    const {
        onChange,
        className,
        placeholder,
        value
    } = props
    const onChangeHandler = ( e: ChangeEvent<HTMLInputElement> ) => {
        onChange?.( e.target.value )
    }
    console.log( 'value', value )
    return (
      <input
        value={ value }
        placeholder={ placeholder }
        onChange={ onChangeHandler }
        className={ classNames( 'w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-600 text-xs', {}, [className] ) }
      />
    );
});
