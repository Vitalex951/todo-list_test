import { useEffect } from "react";
import { useAppDispatch } from "./store/store.ts";
import { fetchTodos } from "./store/service/fetchTodos.ts";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodos())
    }, [])

    return (
      <main className={ 'm-0' }>
          <h1 className='font-bold size-21 caret-emerald-400 m-0'>
              Todos
          </h1>
      </main>
    )
}

export default App
