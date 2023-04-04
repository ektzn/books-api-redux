import axios from 'axios'

const API_BASE_URL = 'https://www.googleapis.com/books/v1'

type SearchBooksParams = {
    query: string
    startIndex: number
    maxResults: number
    category: string
    orderBy: string
}

export const apiCall = async ({
    query,
    startIndex,
    maxResults,
    category,
    orderBy,
}: SearchBooksParams) => {
    const response = await axios.get(`${API_BASE_URL}/volumes`, {
        params: {
            q: `${query}${category !== 'all' ? `+subject:${category}` : ''}`,
            startIndex,
            maxResults,
            printType: 'books',
            orderBy,
            key: process.env.REACT_APP_API_KEY,
        },
    })
    return response.data
}

export const apiCallId = async (bookId: string) => {
    const response = await axios.get(`${API_BASE_URL}/volumes/${bookId}`, {
        params: {
            key: process.env.REACT_APP_API_KEY,
        },
    })
    return response.data
}
