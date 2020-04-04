import React, { Component } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllBooks, getAllGenres } from "./helpers/booktonica-api-fetcher";
import BookCardList from "./components/BookCardList";
import Filter from "./components/Filter";
import "bootstrap/dist/css/bootstrap.min.css";

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

  filterByGenre(genre) {
    //find books, filter, setstate.books as
    //create new list of books
    //filter array by property
    const filteredBooks = this.state.books.filter(book => book.genre === genre);
    this.setState({ books: filteredBooks });
    console.log(filteredBooks);
  }

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
        </Navbar>
        <BookCardList books={this.state.books} />
      </div>
    );
  }
}

export default App;

// <form onSubmit={this.handleSubmit}>
//           <label>
//             Select genre
//             <select genres={this.state.genres} onChange={this.handleChange}>
//               {genres.map(genre => (
//                 <option key={genre.id} genre={this.props.genres}>
//                   {this.props.genres}
//                 </option>
//               ))}{" "}
//             </select>
//           </label>
//           <input type='submit' value='Submit' />
//         </form>
