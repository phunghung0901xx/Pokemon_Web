import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { apiSlice } from '../api'
import globalKeys from '../enums/globalKeys'
import addKeyLocalStorage from '../utils/localStorage'
const preloadedState = localStorage.getItem(addKeyLocalStorage(globalKeys.PRELOADED_STATE)) ? JSON.parse(localStorage.getItem(addKeyLocalStorage(globalKeys.PRELOADED_STATE)) || '{}') : {}

const store = configureStore({
  reducer: {
    
    [apiSlice.reducerPath]: apiSlice.reducer
  },
 preloadedState,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

store.subscribe(() => {
  // const { workplace, user } = store.getState()
  // localStorage.setItem(addKeyLocalStorage(globalKeys.PRELOADED_STATE), JSON.stringify({ workplace, user }))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
