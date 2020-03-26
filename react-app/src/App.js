import React, { Component } from "react";
import "./App.css";
import { getAllBooks } from "./helpers/booktonica-api-fetcher";
import BookCardList from "./components/BookCardList";
import Filter from "./components/Filter";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    getAllBooks().then(books => this.setState({ books: books }));
  }
  render() {
    return (
      <div className='App'>
        <Filter
          genres={[
            { value: "Biography" },
            { value: "Feminism" },
            { value: "Comics" },
            { value: "Humour" },
            { value: "Fiction" },
            { value: "Graphic novel" }
          ]}
        />
        <BookCardList books={this.state.books} />
      </div>
    );
  }
}

export default App;
