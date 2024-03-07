import { createAppSlice } from "./createAppSlice"
import type { PayloadAction } from "@reduxjs/toolkit"

const LS_ITEMS_KEY = 'LS_TODO_ITEMS'
const LS_FILTERS_KEY = 'LS_TODO_FILTERS'
const LS_LENGTH_KEY = 'LS_TODO_MAX_LENGTH'


const initialState: TodoItemsSliceState = {
  items: [],
  filter: 'All',
  isLoading: true,
  maxLength: 25
}

const saveToLs = (key: string, items: unknown): void => {
  localStorage.setItem(key, JSON.stringify(items))
}

const filteredItems = (items: TodoItem[], filter: string): TodoItem[] => {
  switch (filter) {
    case 'Current': return items.filter((i) => !i.isDone)
    case 'Complete': return items.filter((i) => i.isDone)
    default: return items
  }
}

interface Acc {
  All: number
  Complete: number
  Current: number
}
const getCounters = (items: TodoItem[]): Acc => {
  return items.reduce((acc: Acc, i) => {
    return {
      ...acc,
      ...i.isDone ? { Complete: acc.Complete + 1} : { Current: acc.Current + 1}
    }
  }, {All: items.length, Complete: 0, Current: 0})
}

export type Filter = 'All' | 'Current' | 'Complete'

export interface TodoItem {
  id: string
  name: string
  isDone: boolean
  createdOn: number
  lastUpdate: number | null
  isImportant: boolean | undefined
}

export interface TodoItemsSliceState {
  items: TodoItem[]
  filter: Filter
  isLoading: boolean
  maxLength: number
}

export const todoListSlice = createAppSlice({
  name: "todo",
  initialState,
  reducers: (create) => ({
    initialLoad: create.reducer((state, action: PayloadAction<TodoItem[]>) => {
      state.items = action.payload,
      state.isLoading = false
    }),
    addItem: create.reducer((state, action: PayloadAction<TodoItem>) => {
      state.items = [...state.items, action.payload]
      saveToLs(LS_ITEMS_KEY, state.items)
    }),
    toggleDone: create.reducer((state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((i) => i.id === action.payload)
      const item = state.items[index]
      if (item) {
        state.items[index] = {
          ...item, 
          isDone: !item?.isDone, 
          lastUpdate: new Date().getTime()
        }
        saveToLs(LS_ITEMS_KEY, state.items)
      }
    }),
    removeItem: create.reducer((state, action: PayloadAction<string>) => {
      state.items = state.items.filter(({id}) => id !== action.payload)
      saveToLs(LS_ITEMS_KEY, state.items)
    }),
    setFilters: create.reducer((state, action: PayloadAction<Filter>) => {
      state.filter = action.payload
      saveToLs(LS_FILTERS_KEY, state.filter)
    }),
    setMaxLength: create.reducer((state, action: PayloadAction<number>) => {
      state.maxLength = action.payload
      saveToLs(LS_LENGTH_KEY, action.payload)
    }),
    setImportance: create.reducer((state, action: PayloadAction<{id: string, importance: boolean | undefined}>) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id)
      const item = state.items[index]
      if (item) {
        state.items[index] = {
          ...item, 
          isImportant: action.payload.importance, 
          lastUpdate: new Date().getTime()
        }
        saveToLs(LS_ITEMS_KEY, state.items)
      }
    })
  }),
  selectors: {
    selectTodoItems: (state) => filteredItems(state.items, state.filter),
    selectTodoFilters: (state) => state.filter,
    selectCounts: (state) => getCounters(state.items),
    selectLoading: (state) => state.isLoading,
    selectMaxLength: (state) => state.maxLength,
  },
})

// Action creators are generated for each case reducer function.
export const { initialLoad, addItem, toggleDone, removeItem, setFilters, setMaxLength, setImportance } =
  todoListSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectTodoItems, selectTodoFilters, selectCounts, selectLoading, selectMaxLength } = todoListSlice.selectors

export {
  LS_ITEMS_KEY, LS_FILTERS_KEY, LS_LENGTH_KEY
}
export type { Acc }

