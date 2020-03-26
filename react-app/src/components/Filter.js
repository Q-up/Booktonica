import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
class Filter extends Component {
  state = {
    genres: this.props.genres || []
  };
  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle></Dropdown.Toggle>
        <Dropdown.Menu>
          {this.state.genres.map(genre => (
            <Dropdown.Item>{genre.value}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default Filter;
