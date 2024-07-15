import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user/UserSlice'

export const store = configureStore({
    reducer:{
        user:userReducer,
    },
    // middleware:(getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck:false,
    // })
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch