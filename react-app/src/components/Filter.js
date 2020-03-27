import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: "Select Target" };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    console.log(eventKey);
    this.props.passSelectedToParent(eventKey);
  }

  render() {
    return (
      <Dropdown onSelect={this.handleSelect}>
        <Dropdown.Toggle>Select Genre</Dropdown.Toggle>
        <Dropdown.Menu>
          {this.props.genres.map(genre => (
            <Dropdown.Item eventKey={genre.genre}>{genre.genre}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default Filter;
