import { createAppSlice } from "./createAppSlice"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: TodoItemsSliceState = {
  items: [],
  filter: 'All',
}

// const saveToLs = (key: string, items: TodoItem[]): void => {
//   localStorage.setItem(key, JSON.stringify(items))
// }

const filteredItems =(items: TodoItem[], filter: string): TodoItem[] => {
  switch (filter) {
    case 'Current': return items.filter((i) => !i.isDone)
    case 'Complete': return items.filter((i) => i.isDone)
    default: return items
  }
}

export type Filter = 'All' | 'Current' | 'Complete'

export interface TodoItem {
  id: string
  name: string
  isDone: boolean
}

export interface TodoItemsSliceState {
  items: TodoItem[]
  filter: Filter
}

export const todoListSlice = createAppSlice({
  name: "todo",
  initialState,
  reducers: (create) => ({
    initialLoad: create.reducer((state, action: PayloadAction<TodoItem[]>) => {
      state.items = action.payload
    }),
    addItem: create.reducer((state, action: PayloadAction<TodoItem>) => {
      state.items = [...state.items, action.payload]
    }),
    toggleDone: create.reducer((state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((i) => i.id === action.payload)
      const item = state.items[index]
      if (item) {
        state.items[index] = {...item, isDone: !item?.isDone}
      }
    }),
    removeItem: create.reducer((state, action: PayloadAction<string>) => {
      state.items = state.items.filter(({id}) => id !== action.payload)
    }),
    setFilters: create.reducer((state, action: PayloadAction<Filter>) => {
      state.filter = action.payload
    }),
  }),
  selectors: {
    selectTodoItems: (state) => filteredItems(state.items, state.filter),
    selectTodoFilters: (state) => state.filter,
  },
})

// Action creators are generated for each case reducer function.
export const { initialLoad, addItem, toggleDone, removeItem, setFilters } =
  todoListSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectTodoItems, selectTodoFilters } = todoListSlice.selectors

