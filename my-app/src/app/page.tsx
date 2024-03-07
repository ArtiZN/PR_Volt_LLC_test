"use client"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import Actions from "../components/Actions"
import FlexBox from "../components/Flexbox"
import Input from "../components/Input"
import TodoList from "../components/TodoList"
import styles from "./page.module.scss"
import useInitialLoad from "./useInitialLoad"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { addItem, initialLoad, selectMaxLength, setFilters, setMaxLength } from "../store/todoListSlice"
import { nanoid } from "nanoid"
import Footer from "../components/Footer"

export default function Home(): JSX.Element {
  const [inputValue, setInputValue] = useState('')

  const { filter, items, maxLength, isLoaded } = useInitialLoad()

  const dispatch = useAppDispatch()
  const currentMaxLength = useAppSelector(selectMaxLength)

  useEffect(() => {
    if (filter !== 'All' && isLoaded) {
      dispatch(setFilters(filter))
    }
  },[dispatch, filter, isLoaded])

  useEffect(() => { 
    if (isLoaded)
      dispatch(initialLoad(items))
  },[dispatch, items, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      dispatch(setMaxLength(maxLength))
    }
  },[dispatch, maxLength, isLoaded])

  const createItem = (): void => {
    if (inputValue) {
      dispatch(
        addItem({
          id: nanoid(),
          name: inputValue,
          isDone: false,
          createdOn: new Date().getTime(),
          lastUpdate: null
        }))
      clearInput()
    }
  }

  const clearInput = (): void => {
    setInputValue('')
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if(e.key === 'Enter') {
      createItem()
      clearInput()
    }
  }

  return ( 
    <main className={styles.main}>
      <Header />
      <FlexBox className={styles.inputRow}>
        <Input value={inputValue} setValue={setInputValue} onKeydown={onKeyDown} maxLength={currentMaxLength} isError={currentMaxLength === inputValue.length} />
        <Actions onCreate={createItem} />
      </FlexBox>
      <TodoList />
      <Footer />
    </main>
  )
}
