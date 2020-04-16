import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { Paginate } from "./utils/paginate";
import ListGroup from "./common/listgroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviestable";
import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "tiltle", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
    // console.log("clicked", movie);
  };

  handleHeart = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    // console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      selectedGenre,
      movies: allMovies,
      sortColumn
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = Paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    // const ab = this.handleZero();
    // const { length: count } = this.state.movies;
    const { currentPage, pageSize, sortColumn } = this.state;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onSelectItem={this.handleGenreSelect}
          />
        </div>

        <div className="col">
          <p>There are {totalCount} movies in DB</p>
          <MoviesTable
            onHandleHeart={this.handleHeart}
            onHandleDelete={this.handleDelete}
            movies={movies}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }

  handleZero() {
    return this.state.movies.length === 0 ? "zero" : this.state.movies.length;
  }
}

export default Movies;
