import { createAppSlice } from "./createAppSlice"
import type { PayloadAction } from "@reduxjs/toolkit"

const LS_KEY = 'LS_TODO_ITEMS'

const lsValue = localStorage.getItem(LS_KEY)!

const initialState: TodoItemsSliceState = {
  items: lsValue ? JSON.parse(lsValue) : [],
}

const saveToLs = (items: TodoItem[]): void => {
  localStorage.setItem(LS_KEY, JSON.stringify(items))
}

export interface TodoItem {
  id: string
  name: string
  isDone: boolean
}

export interface TodoItemsSliceState {
  items: TodoItem[]
}

export const todoListSlice = createAppSlice({
  name: "counter",
  initialState,
  reducers: (create) => ({
    addItem: create.reducer((state, action: PayloadAction<TodoItem>) => {
      state.items = [...state.items, action.payload] 
      saveToLs(state.items)
    }),
    toggleDone: create.reducer((state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((i) => i.id === action.payload)
      const item = state.items[index]
      if (item) {
        state.items[index] = {...item, isDone: !item?.isDone}
        saveToLs(state.items)
      }
    }),
    removeItem: create.reducer((state, action: PayloadAction<string>) => {
      state.items = state.items.filter(({id}) => id !== action.payload)
      saveToLs(state.items)
    }),
  }),
  selectors: {
    selectTodoItems: (counter) => counter.items,
  },
})

// Action creators are generated for each case reducer function.
export const { addItem, toggleDone, removeItem } =
  todoListSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectTodoItems } = todoListSlice.selectors
