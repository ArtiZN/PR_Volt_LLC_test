"use client"
import { useState } from "react"
import Actions from "../components/Actions"
import FlexBox from "../components/Flexbox"
import Input from "../components/Input"
import TodoList from "../components/TodoList"
import styles from "./page.module.css"

export default function Home(): JSX.Element {
  const [inputValue, setInputValue] = useState('')
  return ( 
    <main className={styles.main}>
      <FlexBox>
        <Input value={inputValue} setValue={setInputValue} />
        <Actions value={inputValue}/>
      </FlexBox>
      <TodoList />
    </main>
  )
}
