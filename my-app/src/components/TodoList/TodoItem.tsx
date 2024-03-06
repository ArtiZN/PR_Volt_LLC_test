import { useAppDispatch } from "../../store/hooks"
import { TodoItem, removeItem, toggleDone } from "../../store/todoListSlice"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import FlexBox from "../Flexbox"
import styles from './styles.module.scss'

interface Props {
  item: TodoItem
}

const TodoItem = ({item}: Props): JSX.Element => {

  const dispatch = useAppDispatch()

  const onToggle = (): void => {
    dispatch(toggleDone(item.id))
  }

  const onDelete = (e: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    e.stopPropagation()
    dispatch(removeItem(item.id))
  }

  console.log(styles)
  
  return <FlexBox onClick={onToggle} className={styles.row} styles={{ ...item.isDone ? { textDecoration: 'line-through' } : {} }}>
    {item.name}
    <DeleteForeverIcon onClick={onDelete} />
  </FlexBox>
}

export default TodoItem