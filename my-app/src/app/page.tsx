import Actions from "../components/Actions"
import FlexBox from "../components/Flexbox"
import Input from "../components/Input"
import TodoList from "../components/TodoList"
import styles from "./page.module.css"

export default function Home(): JSX.Element {
  return (
    <main className={styles.main}>
      <FlexBox>
        <Input />
        <Actions />
      </FlexBox>
      <TodoList />
    </main>
  )
}
