import React, { Component } from "react";
class Liked extends Component {
  state = {};

  render() {
    let ab = "fa fa-heart";
    if (!this.props.liked) ab += "-o";
    return (
      <i
        onClick={this.props.onClick}
        style={{ cursor: "pointer" }}
        className={ab}
        aria-hidden="true"
      ></i>
    );
  }
}

export default Liked;
