"use client"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import Actions from "../components/Actions"
import FlexBox from "../components/Flexbox"
import Input from "../components/Input"
import TodoList from "../components/TodoList"
import styles from "./page.module.css"
import useInitialLoad from "./useInitialLoad"
import { useAppDispatch } from "../store/hooks"
import { initialLoad, setFilters } from "../store/todoListSlice"

export default function Home(): JSX.Element {
  const [inputValue, setInputValue] = useState('')

  const { filter, items } = useInitialLoad()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (filter !== 'All') {
      dispatch(setFilters(filter))
    }
  },[dispatch, filter])

  useEffect(() => {
    if (items.length) {
      dispatch(initialLoad(items))
    }
  },[dispatch, items])

  return ( 
    <main className={styles.main}>
      <Header />
      <FlexBox>
        <Input value={inputValue} setValue={setInputValue} />
        <Actions value={inputValue}/>
      </FlexBox>
      <TodoList />
    </main>
  )
}
