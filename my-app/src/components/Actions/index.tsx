import { addItem } from "../../store/todoListSlice"
import { useAppDispatch } from "../../store/hooks"
import { nanoid } from "nanoid"

interface Props {
  value: string
}

const Actions = ({value}: Props): JSX.Element => {

  const dispatch = useAppDispatch()

  const onClick = (): void => {
    dispatch(addItem({
      id: nanoid(),
      name: value,
      isDone: false
    }))
  }
  return <div>
    <button onClick={onClick}>+</button>
  </div>
}

export default Actions