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
          <label htmlFor="first-name">Your Name :</label>
          <div className="names-container">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={this.model.state.firstName}
              onChange={this.controller.onChange}
              placeholder="First Name..."
            />
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={this.model.state.lastName}
              onChange={this.controller.onChange}
              placeholder="Last Name..."
            />
          </div>

          <br />

          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={this.model.state.email}
            onChange={this.controller.onChange}
            placeholder="Email..."
          />
          <br />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.model.state.password}
            onChange={this.controller.onChange}
            placeholder="Password..."
          />

          <label htmlFor="bio">Biography:</label>
          <textarea
            id="biography"
            name="biography"
            value={this.model.state.biography}
            onChange={this.controller.handleTextAreaChange}
            placeholder="Biography..."
          />

          <label htmlFor="password">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={this.model.state.dob}
            onChange={this.controller.onChange}
            placeholder="Date Of Birth..."
          />

          <label htmlFor="password">Favorite Color:</label>
          <input
            type="color"
            id="favoriteColor"
            name="favoriteColor"
            value={this.model.state.favoriteColor}
            onChange={this.controller.onChange}
            placeholder="Favourite Color"
          />

          <div className="gender-inputs">
            <label htmlFor="gender">Male:</label>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={this.model.state.gender === 'male'}
              onChange={this.controller.onChange}
              placeholder="Gender..."
            />
            <label htmlFor="gender">Female:</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={this.model.state.gender === 'female'}
              onChange={this.controller.onChange}
              placeholder="Gender..."
            />
          </div>

          <label htmlFor="password">Agree to Terms And Services:</label>
          <input
            type="checkbox"
            id="termsAndServices"
            name="termsAndServices"
            checked={this.model.state.termsAndServices}
            onChange={this.controller.handleCheckboxChange}
            placeholder="Terms and Services..."
          />
          <br />

          <input type="submit" value="Submit" />
        </FormStyled>
      </div>
    );
  }
}
