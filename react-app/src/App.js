import React, { Component } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getAllBooks,
  getAllGenres,
  getBooksByGenre
} from "./helpers/booktonica-api-fetcher";
import BookCardList from "./components/BookCardList";
import Filter from "./components/Filter";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      genres: []
    };
  }

  refreshPage() {
    window.location.reload(false);
  }

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
    //find books, filter, setstate.books as
    //create new list of books
    //filter array by property
    // const filteredBooks = this.state.books.filter(book => book.genre === genre);
    // this.setState({ books: filteredBooks });
    // console.log(filteredBooks);
  }

  // componentDidUpdate() {
  //   getBooksByGenre().then(books => this.setState({ books: books }));
  // }

  componentDidMount() {
    getAllBooks().then(books => this.setState({ books: books }));
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
              <InputGroup.Radio onClick={this.filterByTitleAZ.bind(this)} />
              Sort by Title A-Z
            </InputGroup.Prepend>
          </InputGroup>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Radio onClick={this.filterByTitleZA.bind(this)} />
              Sort by Title Z-A
            </InputGroup.Prepend>
          </InputGroup>
        </Navbar>
        <BookCardList books={this.state.books} />
      </div>
    );
  }
}

export default App;
