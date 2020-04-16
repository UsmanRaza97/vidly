import React from "react";
import Modal from "react-responsive-modal";

class TodoList extends React.Component {
  state = {
    value: "",
    value1: "",
    todos: [],
    open: false,
    index: null
  };


  inputchangeHandler = e => {
    this.setState({
      value: e.target.value
    });
  };
  inputchangeHandler1 = e => {
    this.setState({
      value1: e.target.value
    });
  };

  addTodoHandler = () => {
    this.setState({
      todos: [...this.state.todos, this.state.value],
      value: ""
    });
  };

  deleteHandler = i => {
    const todoList = this.state.todos;
    // console.log("Delete Value: ", todoList.splice(i, 1));
    todoList.splice(i, 1);
    this.setState({
      todos: [...todoList]
    });
  };

  editHandler = i => {
    this.setState({
      open: true,
      index: i
    });
  };

  modalCloseHandler = () => {
    this.setState({
      open: false
    });
  };

  updateHandler = () => {
    const updateList = this.state.todos;
    updateList[this.state.index] = this.state.value1;
    this.setState({
      todos: [...updateList],
      open: false,
      value1: ""
    });
  };


  render() {
    let response = this.state.todos.map((todo, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{todo}</td>
          <td>
            <button
              className="btn btn-outline-primary mr-3"
              onClick={() => this.editHandler(index)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                this.deleteHandler(index);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div className="app container">
        <div className="input-group mb-3 mt-3 w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Enter value"
            aria-label="Recipient's username"
            aria-describedby="button-addon1"
            value={this.state.value}
            onChange={this.inputchangeHandler}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon1"
              onClick={this.addTodoHandler}
            >
              Add Todo
            </button>
          </div>
        </div>
        <table className="table border bg-dark text-white">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ToDos</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{response}</tbody>
        </table>
        <Modal open={this.state.open} onClose={this.modalCloseHandler}>
          <div className="input-group container mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Update Value"
              aria-label="Recipient's username with two button addons"
              aria-describedby="button-addon2"
              value={this.state.value1}
              onChange={this.inputchangeHandler1}
            />
            <div className="input-group-append" id="button-addon2">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.updateHandler}
              >
                Update
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default TodoList;
