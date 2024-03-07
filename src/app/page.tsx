"use client"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import Actions from "../components/Actions"
import FlexBox from "../components/Flexbox"
import Input from "../components/Input"
import styles from "./page.module.scss"
import useInitialLoad from "./useInitialLoad"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { addItem, initialLoad, selectMaxLength, setFilters, setImportance, setMaxLength } from "../store/todoListSlice"
import { nanoid } from "nanoid"
import Footer from "../components/Footer"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend'
import TodoListWrapper from "@/components/TodoList/TodoListWrapper"
import { cn } from "@/helpers"

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
          lastUpdate: null,
          isImportant: undefined
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

  const handleStatusMove = (
    id: string,
    importance: boolean | undefined
  ) : void=> {
    dispatch(setImportance({id, importance}))
  }

  return ( 
    <main className={styles.main}>
      <Header />
      <FlexBox className={styles.inputRow}>
        <Input value={inputValue} setValue={setInputValue} onKeydown={onKeyDown} maxLength={currentMaxLength} isError={currentMaxLength === inputValue.length} />
        <Actions onCreate={createItem} />
      </FlexBox>
      {/* This will be shown only on 1400+ width monitors due to content visibility*/}
      <FlexBox className={cn(styles.content, styles.desktopOnly)}>
        <DndProvider backend={HTML5Backend}>
          <TodoListWrapper importance={false} onMove={handleStatusMove} />
          <TodoListWrapper importance={undefined} onMove={handleStatusMove}/>
          <TodoListWrapper importance={true} onMove={handleStatusMove} />
        </DndProvider>
      </FlexBox>
      {/* This will be shown on other devices */}
      <FlexBox className={cn(styles.content, styles.mobile)}>
        <DndProvider backend={HTML5Backend}>
          <TodoListWrapper importance={undefined} />
        </DndProvider>
      </FlexBox>
      <Footer />
    </main>
  )
}
