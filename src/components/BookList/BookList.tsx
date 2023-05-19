import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    selectBooks,
    selectSearchObj,
    selectLoading,
    selectError,
    selectTotalItems,
} from '../../features/books/bookSelect'
import { fetchBooks } from '../../features/books/bookThunks'
import { useAppDispatch } from '../../hooks'
import { Book } from '../../types'
import BookCard from '../BookCard/BookCard'
import './BookList.css'

const BookList: React.FC = () => {
    const dispatch = useAppDispatch()
    const books = useSelector(selectBooks)
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)
    const searchObj = useSelector(selectSearchObj)
    const totalItems = useSelector(selectTotalItems)

    const [startIndex, setStartIndex] = useState<number>(0)
    const searchBooks = async (startIndex: number) => {
        if (searchObj) {
            dispatch(fetchBooks({ startIndex, searchObj }))
        }
    }

    const handleLoadMore = async () => {
        if (searchObj) {
            setStartIndex(startIndex + 30)
            await searchBooks(startIndex + 30)
        }
    }

    useEffect(() => {
        if (searchObj) {
            searchBooks(0)
        }
    }, [searchObj])

    if (loading && startIndex === 0) {
        return <p className="Loading">Loading...</p>
    }

    if (error) {
        return <p className="Error">Error: {error}</p>
    }

    if (books === undefined) {
        return <p className="Error">Error: Books Not Found</p>
    }

    return (
        <div className="SearchResults">
            {books.length !== 0 && (
                <p className="TotalItems">Total Items: {totalItems}</p>
            )}
            <div className="BookList">
                {books.map((book: Book) => {
                    return <BookCard key={book.id} book={book} />
                })}
            </div>
            {totalItems > startIndex && totalItems > 30 ? (
                <div>
                    <button className="LoadMore" onClick={handleLoadMore}>
                        {!loading && 'Load more'}
                        {loading && startIndex !== 0 && 'Loading more!!!'}
                    </button>
                </div>
            ) : null}
        </div>
    )
}

export default BookList
