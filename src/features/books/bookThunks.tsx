import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiCall, apiCallId } from './bookApi'
import {
    setBooks,
    setTotalItems,
    setError,
    setLoading,
    setCurrentBook,
    setMoreBooks,
} from './bookSlice'
import axios, { AxiosError } from 'axios'

export const fetchBooks = createAsyncThunk<
    void,
    {
        startIndex: number
        searchObj: {
            query: string
            category: string
            orderBy: string
        }
    }
>('books/fetchBooks', async ({ startIndex, searchObj }, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true))
        const response = await apiCall({
            query: searchObj.query,
            startIndex: startIndex,
            maxResults: 30,
            category: searchObj.category,
            orderBy: searchObj.orderBy,
        })
        if (startIndex === 0) {
            thunkAPI.dispatch(setBooks(response.items))
            thunkAPI.dispatch(setTotalItems(response.totalItems))
        } else {
            thunkAPI.dispatch(setMoreBooks(response.items))
        }
        thunkAPI.dispatch(setTotalItems(response.totalItems))
    } catch (error: unknown | AxiosError) {
        if (axios.isAxiosError(error) && error.response) {
            thunkAPI.dispatch(
                setError(thunkAPI.rejectWithValue(error.response.data))
            )
        }
    }
})

export const fetchBookById = createAsyncThunk<void, string>(
    'books/getBookById',
    async (id, thunkAPI) => {
        try {
            const response = await apiCallId(id)
            thunkAPI.dispatch(setCurrentBook(response))
        } catch (error: unknown | AxiosError) {
            if (axios.isAxiosError(error) && error.response) {
                thunkAPI.dispatch(
                    setError(thunkAPI.rejectWithValue(error.response.data))
                )
            }
        }
    }
)
