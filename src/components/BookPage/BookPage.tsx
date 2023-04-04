import React, { useState, useEffect } from 'react'
import { Book } from '../../types'
import './BookPage.css'

type Props = {
    book: Book
}

const BookPage: React.FC<Props> = (props) => {
    const { book } = props
    return (
        <div className="book-page__group">
            {book.volumeInfo.imageLinks && (
                <img
                    className="book-page__img"
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                />
            )}
            <h3 className="book-page__title">{book.volumeInfo.title}</h3>
            <p className="book-page__category">
                {book.volumeInfo.categories && <p>Categories:</p>}
                {book.volumeInfo.categories &&
                    book.volumeInfo.categories.join(', ')}
            </p>
            <p className="book-page__authors">
                {book.volumeInfo.authors && <p>Authors:</p>}
                {book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}
            </p>
            <p className="book-page__desc">
                {book.volumeInfo.description && <p>Description:</p>}
                {book.volumeInfo.description}
            </p>
        </div>
    )
}

export default BookPage
