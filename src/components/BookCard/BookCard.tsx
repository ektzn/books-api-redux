import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectBookById } from '../../features/books/bookSelect'
import { setCurrentBook } from '../../features/books/bookSlice'
import { selectLoading, selectError } from '../../features/books/bookSelect'
import { fetchBookById } from '../../features/books/bookThunks'
import Modal from 'react-modal'
import { Book } from '../../types'
import { useAppDispatch } from '../../hooks'
import './BookCard.css'
import BookPage from '../BookPage/BookPage'

type Props = {
    book: Book
}

const BookCard: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch()
    const { book } = props
    const error = useSelector(selectError)
    Modal.setAppElement('#root')

    const [showModal, setShowModal] = useState(false)

    const handleOpenModal = () => {
        setShowModal(true)
        dispatch(fetchBookById(book.id))
    }

    const handleCloseModal = () => {
        setShowModal(false)
        dispatch(setCurrentBook(null))
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!book) {
        return null
    }

    return (
        <>
            <Modal
                isOpen={showModal}
                onRequestClose={handleCloseModal}
                shouldCloseOnOverlayClick={false}
                contentLabel="onRequestClose Example"
                className="Modal"
                overlayClassName="Overlay"
            >
                <div className="book-card__group">
                    <BookPage book={book} />
                    <button
                        className="book-card__close"
                        onClick={handleCloseModal}
                    >
                        Close
                    </button>
                </div>
            </Modal>
            <div className="book-card" onClick={handleOpenModal}>
                {book.volumeInfo.imageLinks && (
                    <img
                        className="book-card__img"
                        src={book.volumeInfo.imageLinks.thumbnail}
                        alt={book.volumeInfo.title}
                    />
                )}
                <div className="book-card__group">
                    <h3 className="book-card__title">
                        {book.volumeInfo.title}
                    </h3>
                    <p className="book-card__category">
                        {book.volumeInfo.categories &&
                            book.volumeInfo.categories[0]}
                    </p>
                    <p className="book-card__authors">
                        {book.volumeInfo.authors &&
                            book.volumeInfo.authors.join(', ')}
                    </p>
                </div>
            </div>
        </>
    )
}

export default BookCard
