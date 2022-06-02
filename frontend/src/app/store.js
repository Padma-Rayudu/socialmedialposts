import { configureStore } from '@reduxjs/toolkit';

import  userReducer from '../features/users/userslice'
import postsReducer from '../features/posts/postsSlice'
import advsReducer  from '../features/advertisements/adSlice'
export const store = configureStore({
    reducer:{
      userReducer,postsReducer,advsReducer
    },
  })
  export default store;