import { createSlice } from '@reduxjs/toolkit'
import { Book } from '../../types'

const bookSlice = createSlice({
    name: 'books',
    initialState: {
        books: [] as Book[],
        totalItems: 0,
        loading: false,
        error: null,
        currentBook: null,
        searchObj: undefined,
    },
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload
            state.loading = false
            state.error = null
        },
        setMoreBooks: (state, action) => {
            state.books = [...state.books, ...action.payload]
            state.loading = false
            state.error = null
        },
        setTotalItems: (state, action) => {
            state.totalItems = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        setCurrentBook: (state, action) => {
            state.currentBook = action.payload
        },
        setSearchObj: (state, action) => {
            state.searchObj = action.payload
        },
    },
})

export const {
    setBooks,
    setMoreBooks,
    setTotalItems,
    setLoading,
    setError,
    setCurrentBook,
    setSearchObj,
} = bookSlice.actions

export default bookSlice.reducer
