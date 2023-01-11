import { FormStyled } from '../styles/From.styled';
import React from 'react';
import { FormModel } from './FormModel';
import { FormController } from './FormController';

export interface FormProps {
  model: FormModel;
  controller: FormController;
}

// The view's responsibility is to simply display the UI
export class FormView extends React.Component<FormProps> {
  model: FormModel;

  controller: FormController;

  constructor(props: FormProps) {
    super(props);
    this.model = props.model;
    this.controller = props.controller;
    this.state = this.model.state;
  }

  componentDidMount() {
    this.model.subscribe(this.updateState);
  }

  componentWillUnmount() {
    this.model.unsubscribe(this.updateState);
  }

  updateState = (newData: FormData) => {
    this.setState({ ...newData });
  };

  render() {
    return (
      <div className="container">
        <FormStyled onSubmit={this.controller.onSubmit}>
          <label htmlFor="first-name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={this.model.state.name}
            onChange={this.controller.onChange}
          />
          <br />

          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={this.model.state.email}
            onChange={this.controller.onChange}
          />
          <br />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.model.state.password}
            onChange={this.controller.onChange}
          />

          <input type="submit" value="Submit" />
        </FormStyled>
      </div>
    );
  }
}
