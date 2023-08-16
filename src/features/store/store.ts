import {configureStore} from '@reduxjs/toolkit';
import AccountReduecers from '@src/features/store/account/AccountSlice';
import DeciveReducers from '@src/features/store/device/DeviceSlice';
import {ReducerTypes} from '@src/features/store/types';

export const store = configureStore({
  reducer: {
    [ReducerTypes.ACCOUNT]: AccountReduecers,
    [ReducerTypes.DEVICE]: DeciveReducers,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
