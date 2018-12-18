import React, { Component } from 'react';
import BookList from './BookList'

class BookShelf extends Component {


  state = {
    shelf: [
      {id: 'currentlyReading',value: 'Currently Reading'},
      {id: 'wantToRead',value: 'Want to Read'},
      {id: 'read',value: 'Read'}
    ]
  }

  render() {

      return (
        <div className="list-books-content">
          <div>
            {this.state.shelf.map((shelf) => (
              <div className="bookshelf" key={shelf.id}>
                <h2 className="bookshelf-title">{shelf.value}</h2>
                <div className="bookshelf-books">
                  <BookList books={this.props.books} shelf={shelf.id} changeShelf={this.props.changeShelf} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }



export default BookShelf
