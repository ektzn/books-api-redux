import React, { useState, useEffect } from 'react'
import { setError, setSearchObj } from '../../features/books/bookSlice'
import { useSelector } from 'react-redux'
import { selectError } from '../../features/books/bookSelect'
import { useAppSelector, useAppDispatch } from '../../hooks'
import './SearchModule.css'

const categories = [
    'all',
    'art',
    'biography',
    'computers',
    'history',
    'medical',
    'poetry',
]
const sortOptions = ['relevance', 'newest']

const SearchModule: React.FC = () => {
    const dispatch = useAppDispatch()
    const error = useSelector(selectError)
    const [category, setCategory] = useState(categories[0])
    const [sortOption, setSortOption] = useState(sortOptions[0])
    const [term, setTerm] = useState<string>()
    const search = () => {
        if (term === undefined || term === null || term.trim().length === 0) {
            dispatch(setError('Enter book name'))
            return
        }
        dispatch(
            setSearchObj({
                query: term,
                category: category,
                orderBy: sortOption,
            })
        )
    }
    const handleTermChange = (e: any) => {
        setTerm(e.target.value)
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            search()
        }
    }

    return (
        <div className="SearchModule">
            <div className="SearchField">
                <input
                    className="SearchInput"
                    placeholder="Search for Books"
                    onChange={handleTermChange}
                    onKeyDown={handleKeyDown}
                />
                <button className="SearchButton" onClick={search}>
                    Search
                </button>
            </div>
            <div className="SearchSelectors">
                <div className="SearchSelectorCategory">
                    <p className="SearchSelectorCategoryDesc">Category:</p>
                    <select
                        className="SearchCategorySortItem"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="SearchSelectorSort">
                    <p className="SearchSelectorSortDesc">Sort by:</p>
                    <select
                        className="SearchSelectorSortItem"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        {sortOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default SearchModule
