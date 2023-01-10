import { FormStyled } from '../styles/From.styled';
import React from 'react';

interface FormData {
  name: string;
  email: string;
  password: string;
  biography: string;
}

// The model's responsibility is to hold the state and when
// Changed by the Controller, to update the view
class FormModel {
  state: FormData = {
    name: '',
    email: '',
    password: '',
    biography: '',
  };

  subscribers: Array<(...args: any[]) => any> = [];

  subscribe = (fn: (...args: any[]) => any) => {
    this.subscribers.push(fn);
  };

  unsubscribe = (fn: (...args: any[]) => any) => {
    this.subscribers.filter((sub) => sub !== fn);
  };

  setData = (data: FormData) => {
    this.state = { ...data };
    for (let i = 0; i < this.subscribers.length; i++) {
      this.subscribers[i](data);
    }
  };
}

interface FormProps {
  model: FormModel;
  controller: FormController;
}

// The view's responsibility is to simply display the UI
class FormView extends React.Component<FormProps> {
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

interface FormControllerProps {
  model: FormModel;
}

/**
 * The controller is responsible for business logic and updating the model
 */
class FormController {
  model: FormModel;

  constructor(props: FormControllerProps) {
    this.model = props.model;
    this.onChange = this.onChange.bind(this);
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    this.model.setData({ ...this.model.state, [name]: value });
    console.log(model);
  }

  onSubmit(event: React.FormEvent) {
    event.preventDefault();

    console.log(model.state);
  }
}

const model = new FormModel();
const controller = new FormController({ model });

const mvc = {
  model,
  controller,
  FormView,
};

export default mvc;
