import { useAppSelector } from "../../store/hooks"
import { selectTodoItems } from "../../store/todoListSlice"
import TodoItem from "./TodoItem"
import styles from './styles.module.scss'

const TodoList = (): JSX.Element => {
  const data = useAppSelector(selectTodoItems)
  return <div className={styles.container}>{data.map((item) => <TodoItem key={item.id} item={item}/>)}</div> 
}

export default TodoList