import { useAppDispatch } from "../../store/hooks"
import { TodoItem, removeItem, toggleDone } from "../../store/todoListSlice"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import styles from './styles.module.scss'
import { cn } from "../../helpers"
import { useDrag } from "react-dnd"
import { useRef } from "react"

interface Props {
  item: TodoItem
  dndDisabled?: boolean
}

const TodoItem = ({item, dndDisabled}: Props): JSX.Element => {
  const ref = useRef(null)
  const [, drag] = useDrag(() => ({
    type: 'STATUS',
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),

    item: ():  {id: string} => {
      return {id: item.id}
    }
  }))

  drag(ref)

  const dispatch = useAppDispatch()

  const onToggle = (): void => {
    dispatch(toggleDone(item.id))
  }

  const onDelete = (e: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    e.stopPropagation()
    dispatch(removeItem(item.id))
  }
  
  return <div ref={dndDisabled ? null : ref} onClick={onToggle} className={cn(styles.row, styles.todoItem, item.isDone && styles.done)}>
    {item.name}
    <DeleteForeverIcon onClick={onDelete} />
  </div>
}

export default TodoItem