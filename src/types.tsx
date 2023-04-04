export interface Book {
    id: string
    volumeInfo: {
        title: string
        authors: string[]
        publisher: string
        publishedDate: string
        description: string
        industryIdentifiers: { type: string; identifier: string }[]
        readingModes: { text: boolean; image: boolean }
        pageCount: number
        printType: string
        categories: string[]
        maturityRating: string
        imageLinks: { smallThumbnail: string; thumbnail: string }
        language: string
    }
}
