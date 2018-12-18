import React, { Component } from 'react';


class BookList extends Component {
  state = {
    type: [
      {id: 'currentlyReading',value: 'Currently Reading'},
      {id: 'wantToRead',value: 'Want to Read'},
      {id: 'read',value: 'Read'},
      {id: 'none',value: 'None'}
    ],
  }

  render() {
      let booksList = [];
      let shelf = '';
      if(this.props.shelf){
        for(var item of this.props.books){
          if(item.shelf === this.props.shelf){
            booksList.push(item);
          }
        }
        shelf = this.props.shelf
      }else{
        booksList = this.props.books;
      }

      return (

        <ol className="books-grid">
          {booksList.map((books) => (
            <li key={books.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${books.imageLinks.smallThumbnail})` }}></div>
                  <div className="book-shelf-changer">
                    <select defaultValue={books.shelf} onChange={(e) => (this.props.changeShelf(books, e.target.value))} >
                      <option value="move" disabled>Move to...</option>
                      {this.state.type.map((type) => (
                        <option key={type.id} value={type.id}>{type.value}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="book-title">{books.title}</div>
                <div className="book-authors">{books.authors}</div>
              </div>
            </li>
          ))}
        </ol>
      )
    }
  }



export default BookList
