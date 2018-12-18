import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'
class SearchBooks extends Component {
  state = {
    query: '',
    result: []
  }

  updateQuery = (query) => {
    this.setState({ query })
    BooksAPI.search(this.state.query).then((result) => {
			if (Array.isArray(result)) {
				for (let item of result) {
					for (let book of this.props.books) {
						if (book.id === item.id) {
							item.shelf = book.shelf;
						}
					}
					if (item.shelf == null || item.shelf === undefined) {
						item.shelf = 'none';
					}
				}
				this.setState({ result })
			}
			else {
				this.setState({ result: [] })
			}
		})
  }

  render() {
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/'>
              <button className="close-search">Close</button>
            </Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" onChange={(event) => this.updateQuery(event.target.value)} placeholder="Search by title or author"/>

            </div>
          </div>
          <div className="search-books-results">
            <BookList books={this.state.result} changeShelf={this.props.changeShelf} />
          </div>
        </div>
      )
    }
  }



export default SearchBooks
