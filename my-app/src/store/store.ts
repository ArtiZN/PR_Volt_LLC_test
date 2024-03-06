import type { EnhancedStore } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { todoListSlice } from "./todoListSlice"

const rootReducer = combineSlices(todoListSlice)
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (): EnhancedStore => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]
