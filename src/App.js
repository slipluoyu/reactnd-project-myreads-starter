import React from 'react'
import { Route,Link } from 'react-router-dom';

import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

     books: []
  }
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      let hasBook = false;
      for (let item of this.state.books) {
        if (item.id === book.id) {
          hasBook = true;
        }
      }
      if (hasBook === true) {
        this.setState((state) => ({
          books: state.books.map(
            function(b) {
              if (b.id === book.id) {
                b.shelf = shelf;
              }
            return b;
          })
        }))
      }
      else {
        this.setState( (state) => {
          book.shelf = shelf;
          return { books: state.books.concat(book) }
        });
      }
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <SearchBooks books={this.state.books} changeShelf={this.changeShelf} />
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookShelf books={this.state.books} changeShelf={this.changeShelf} />
            <div className="open-search">
              <Link to='/search'>
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
