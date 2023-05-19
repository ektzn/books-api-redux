import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const selectBooksState = (state: RootState) => state.books

export const selectBooks = createSelector(
    selectBooksState,
    (booksState) => booksState.books
)

export const selectLoading = createSelector(
    selectBooksState,
    (booksState) => booksState.loading
)

export const selectError = createSelector(
    selectBooksState,
    (booksState) => booksState.error
)

export const selectTotalItems = createSelector(
    selectBooksState,
    (booksState) => booksState.totalItems
)

export const selectBookById = (id: string) =>
    createSelector(selectBooksState, (booksState) =>
        booksState.books.find((book) => book.id === id)
    )

export const selectSearchObj = createSelector(
    selectBooksState,
    (booksState) => booksState.searchObj
)
