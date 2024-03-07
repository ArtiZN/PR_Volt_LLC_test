import CircularProgress from "@mui/material/CircularProgress"
import { useAppSelector } from "../../store/hooks"
import { selectLoading, selectTodoFilters, selectTodoItems } from "../../store/todoListSlice"
import TodoItem from "./TodoItem"
import styles from './styles.module.scss'
import { cn } from "../../helpers"
import { shallowEqual } from "react-redux"

const TodoList = (): JSX.Element => {
  const data = useAppSelector(selectTodoItems, shallowEqual)
  const filter = useAppSelector(selectTodoFilters)
  const isLoading = useAppSelector(selectLoading)

  if (isLoading) {
    return <div className={cn(styles.container, styles.center)}>
      <CircularProgress />
    </div>
  }

  if (!data.length) {
    return <div className={cn(styles.container, styles.placeholder)}>
      {filter === 'All' ? 'Create your first Todo item' : 'Empty here. Maybe clearing filters would help'} 
    </div>
  }

  return <ul className={styles.container}>{data.map((item) => 
    <TodoItem key={item.id} item={item}/>)}
  </ul> 
}

export default TodoList