import React, { Component } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getAllBooks,
  getAllGenres,
  getBooksByGenre,
  searchByBook
} from "./helpers/booktonica-api-fetcher";
import BookCardList from "./components/BookCardList";
import Filter from "./components/Filter";
import Search from "./components/Search";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      genres: [],
      search: "Search Books..."
    };
  }

  refreshPage() {
    window.location.reload(false);
  }

  resetBookList() {
    getAllBooks().then(books => this.setState({ books: books }));
  }

  searchBookName = bookName => {
    searchByBook(bookName).then(books => this.setState({ books: books }));
  };

  filterByTitleAZ() {
    const sortedBooks = this.state.books.sort((a, b) =>
      a.title > b.title ? 1 : -1
    );
    this.setState({ books: sortedBooks });
    console.log(sortedBooks);
  }

  filterByTitleZA() {
    const sortedBooks = this.state.books.sort((a, b) =>
      a.title < b.title ? 1 : -1
    );
    this.setState({ books: sortedBooks });
    console.log(sortedBooks);
  }

  filterByGenre(genre) {
    getBooksByGenre(genre).then(books => this.setState({ books: books }));
  }

  componentDidMount() {
    this.resetBookList();
    getAllGenres().then(genres => this.setState({ genres: genres }));
  }

  render() {
    return (
      <div>
        <Navbar>
          <Filter
            genres={this.state.genres}
            passSelectedToParent={this.filterByGenre.bind(this)}
          />
          <Button variant='light' onClick={this.refreshPage.bind(this)}>
            Reset
          </Button>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Radio
                onClick={this.filterByTitleAZ.bind(this)}
                name='sortBook'
              />
              Sort by Title A-Z
            </InputGroup.Prepend>
          </InputGroup>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Radio
                onClick={this.filterByTitleZA.bind(this)}
                name='sortBook'
              />
              Sort by Title Z-A
            </InputGroup.Prepend>
          </InputGroup>
          <Search
            searchBookName={this.searchBookName}
            reset={this.resetBookList.bind(this)}
          />
        </Navbar>
        <BookCardList books={this.state.books} />
      </div>
    );
  }
}

export default App;
