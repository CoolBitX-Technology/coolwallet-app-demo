import { configureStore } from '@reduxjs/toolkit';
import AccountReduecers from '@src/features/store/account/AccountSlice';
import DeciveReducers from '@src/features/store/device/DeviceSlice';
import LogReducers from '@src/features/store/log/LogSlice';
import { ReducerTypes } from '@src/features/store/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, PAUSE, PERSIST, PURGE, Persistor, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

// ============ Persistor ============ start
let persistor: Persistor | undefined;
export function initPersistor(): void {
  console.log('initPersistor');
  persistor = persistStore(store);
}
export function getPersistor(): Persistor {
  if (!persistor) initPersistor();
  return persistor as Persistor;
}
// ============ Persistor ============ end

export const store = configureStore({
  reducer: combineReducers({
    [ReducerTypes.ACCOUNT]: persistReducer({ key: ReducerTypes.ACCOUNT, storage: AsyncStorage }, AccountReduecers),
    [ReducerTypes.DEVICE]: DeciveReducers,
    [ReducerTypes.LOG]: LogReducers,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // fix redux-toolkit + redux-persist lint error.
      // ref: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
