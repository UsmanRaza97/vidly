import React, { Component } from "react";
import { Link } from "react-router-dom";
import Liked from "./like";
import Table from "./common/table";
class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Liked
          liked={movie.liked}
          onClick={() => this.props.onHandleHeart(movie)}
        />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onHandleDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    const {
      movies,
      // onHandleHeart,
      // onHandleDelete,
      onSort,
      sortColumn
    } = this.props;
    return (
      <Table
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default MoviesTable;
