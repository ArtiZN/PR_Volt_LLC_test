import { useAppSelector } from "../../store/hooks"
import { selectTodoItems } from "../../store/todoListSlice"
import TodoItem from "./TodoItem"

const TodoList = (): JSX.Element => {
  const data = useAppSelector(selectTodoItems)
  return <div>{data.map((item) => <TodoItem key={item.id} item={item}/>)}</div> 
}

export default TodoList