import styles from './Todo.module.scss';
import { ITodo } from "../../gateways/models/todo.ts";
import { classNames } from "../../shared/utils/classNames/classNames.ts";
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";

interface TodoProps {
    todo: ITodo,
    onDelete?: ( id: number ) => void,
    onChange?: () => void,
}

export const Todo = ( props: TodoProps ) => {
    const {
        todo,
        onChange,
        onDelete
    } = props

    const {
        title,
        description,
        date,
        id
    } = todo
    const formattedDate = format( date, 'dd.MM.yyyy', { locale: ru } );
    return (
      <div
        className={classNames( styles.wrapper, {}, ['flex flex-col max-w-52 p-2.5 gap-1.5 w-48'] )}>
          <div className={styles.title}>
              {title}
          </div>

          <div className={styles.description}>
              {description}
          </div>
          <div className={classNames( styles.date, {}, ['relative min-h-3.5'] )}>
              <span className={'absolute bottom-0 right-0'}>{formattedDate}</span>
          </div>
      </div>
    );
};
