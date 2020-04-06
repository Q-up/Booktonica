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

//function generator to generate a sort function using a parameter and optional convertor
//eg arrayOfObjs.sort(genSorter('foo', item => item.reverse))
//equivalent to arrayOfObjs.sort((a, b) => a.foo.reverse > b.foo.reverse ? 1 : -1);
function genSorter(param = null, converter = item => item) {
  if (param) {
    return (a, b) => (converter(a[param]) > converter(b[param]) ? 1 : -1);
  } else {
    return (a, b) => (converter(a) > converter(b) ? 1 : -1);
  }
}
//to reverse the order of one of the generated sorters
function reverse(sorter) {
  return (a, b) => sorter(b, a);
}

const byDate = genSorter("publication_date", item => Date.parse(item));
const byDateDesc = reverse(byDate);
const byTitle = genSorter("title");
const byTitleDesc = reverse(byTitle);

/*
const sortFunctions = {
  'By Date': genSorter('publication_date', item => Date.parse(item)),
  'By Title': genSorter('title'),
  'By Title (Z->A)': reverse(genSorter('title', item => item)),
  'By Author': genSorter('author'),
  'By Author (Z->A)': reverse(genSorter('author')),
  'By Genre': genSorter('genre'),
  // ...
}
*/

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

  bookSorter(func) {
    this.setState({ books: this.state.books.sort(func) });
  }

  filterByGenre(genre) {
    getBooksByGenre(genre).then(books => this.setState({ books: books }));
  }

  componentDidMount() {
    this.resetBookList();
    getAllGenres().then(genres => this.setState({ genres: genres }));
  }

  input(typeSort, label) {
    return (
      <InputGroup.Prepend>
        <InputGroup.Radio
          onClick={this.bookSorter.bind(this, typeSort)}
          name='sortBook'
        />
        {label}
      </InputGroup.Prepend>
    );
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
            {this.input(byDateDesc, "Publication Date Newest")}
            {this.input(byDate, "Publication Date Oldest")}
            {this.input(byTitle, "Title A-Z")}
            {this.input(byTitleDesc, "Title Z-A")}
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
