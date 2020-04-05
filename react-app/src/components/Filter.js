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

  myDropDownItem(data) {
    return (
      <Dropdown.Item key={data} eventKey={data}>
        {data}
      </Dropdown.Item>
    );
  }

  render() {
    return (
      <Dropdown onSelect={this.handleSelect}>
        <Dropdown.Toggle variant='light'>Select Genre</Dropdown.Toggle>
        <Dropdown.Menu>
          {this.props.genres.map(genre => this.myDropDownItem(genre.genre))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default Filter;
