import { classNames } from "../../shared/utils/classNames/classNames.ts";
import styles from './Button.module.scss'
import { memo } from "react";

interface ButtonProps {
    text: string
    onClick?: () => void
    disabled?: boolean
    className?: string
}

export const Button = memo( ( props: ButtonProps ) => {
    const {
        onClick,
        text,
        disabled = false,
        className
    } = props

    return (
      <button
        className={ classNames( styles.button, {}, [className] ) }
        onClick={ onClick }
        disabled={ disabled }
      >
          { text }
      </button>
    );
} )
