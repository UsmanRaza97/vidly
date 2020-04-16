import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./form";
import Input from "./common/input";
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };
  schema = {
    username: Joi.string().required(),
    password: Joi.string().required()
  };

  doSubmit = e => {
    console.log("Submitted");
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleChange}
            value={data.username}
            name="username"
            label="Username"
            error={errors.username}
          />
          <Input
            onChange={this.handleChange}
            value={data.password}
            name="password"
            label="Password"
            error={errors.password}
          />

          {this.renderButton("login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
