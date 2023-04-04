import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './features/books/bookSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    // Другие reducers могут быть добавлены здесь
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
