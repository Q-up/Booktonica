import React, { Component } from "react";
import "./App.css";
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

  filterByGenre(genre) {
    //find books, filter, setstate.books as
    //create new list of books
    //filter array by property
    console.log(genre);
  }

  componentDidMount() {
    getAllBooks().then(books => this.setState({ books: books }));
    getAllGenres().then(genres => this.setState({ genres: genres }));
  }
  render() {
    return (
      <div>
        <Filter
          genres={this.state.genres}
          passSelectedToParent={this.filterByGenre}
        />
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
