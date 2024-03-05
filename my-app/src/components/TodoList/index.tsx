import { nanoid } from "nanoid"

const TodoList = (): JSX.Element => {
  const mockedList = Array(24).fill({
    id: () => nanoid(),
    value: 'asmtasdfasd sdfa sdf asdf asdf'
  })
  return <div>{mockedList.map((i) => <div key={i.id}>{i.value}</div>)}</div> 
}

export default TodoList