import { configureStore } from '@reduxjs/toolkit';

import userSlice from '../features/usertoken/userSlice';
import userinfoSlice from '../features/usertoken/userinfoSlice'

import { setupListeners } from '@reduxjs/toolkit/query'
import { youtubeapi } from '../services/youtubeapi';
import userToken from '../features/usertoken/userToken';

export const store = configureStore({
  
  reducer: {
    auth : userSlice,
    token : userToken,
    user_info : userinfoSlice,
    [youtubeapi.reducerPath]: youtubeapi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(youtubeapi.middleware)

});

setupListeners(store.dispatch)

