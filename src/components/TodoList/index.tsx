import CircularProgress from "@mui/material/CircularProgress"
import { useAppSelector } from "../../store/hooks"
import { TodoItem as TodoItemInterface, selectLoading, selectTodoFilters, selectTodoItems } from "../../store/todoListSlice"
import TodoItem from "./TodoItem"
import styles from './styles.module.scss'
import { cn } from "../../helpers"
import { shallowEqual } from "react-redux"

interface Props {
  importance: boolean | undefined
  showAll?: boolean
}

const filterByImportance = (data: TodoItemInterface[], importance: boolean | undefined): TodoItemInterface[] => {
  return data.filter((i) => i.isImportant === importance)
}

const TodoList = ({ importance, showAll }: Props): JSX.Element => {

  const data = useAppSelector(selectTodoItems, shallowEqual)

  const dataCollection = filterByImportance(data, importance)
  const filter = useAppSelector(selectTodoFilters)
  const isLoading = useAppSelector(selectLoading)

  if (isLoading) {
    return <div className={cn(styles.container, styles.center)}>
      <CircularProgress />
    </div>
  }

  if (!dataCollection.length) {
    return <div className={cn(styles.container, styles.placeholder)}>
      {filter === 'All' ? 
        typeof importance === 'undefined' ? 'Create new ToDo item' : 'Drag and Drop here' 
        : 'Empty here. Maybe clearing filters would help'} 
    </div>
  }

  return <ul className={styles.container}>{[...showAll ? data : dataCollection].map((item) => 
    <TodoItem key={item.id} item={item} dndDisabled={showAll}/>)}
  </ul> 
}

export default TodoList