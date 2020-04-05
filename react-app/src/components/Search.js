import React, { Component } from "react";

class Search extends Component {
  updateSearch = event => {
    if (event.target.value.length > 0) {
      this.props.searchBookName(event.target.value.toLowerCase());
    } else {
      this.props.reset();
    }
  };

  render() {
    return (
      <div>
        <input
          id='search'
          label='Search'
          placeholder='Search...'
          type='text'
          onChange={this.updateSearch}
        />
      </div>
    );
  }
}

export default Search;
