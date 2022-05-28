import { configureStore } from '@reduxjs/toolkit';
import nameReducer from '../features/nameSlice';
import uiReducer from '../features/uiSlice';


export function makeStore() {
    return configureStore({
      reducer: { name: nameReducer, ui: uiReducer },
    })
  }
  
  const store = makeStore()
  
  export default store
  