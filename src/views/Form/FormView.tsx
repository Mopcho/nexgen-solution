import { FormStyled } from '../styles/From.styled';
import React from 'react';
import { FormModel, FormModelState } from './FormModel';
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

  updateState = (newData: FormModelState) => {
    this.setState({ ...newData });
  };

  render() {
    return (
      <div className="container">
        <FormStyled onSubmit={this.controller.onSubmit}>
          <label htmlFor="first-name">Your Name :</label>
          <div className="names-container">
            <div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={this.model.state.formData.firstName}
                onChange={this.controller.onChange}
                placeholder="First Name..."
              />
              {this.model.state.formErrors.firstName ? (
                <span>{this.model.state.formErrors.firstName}</span>
              ) : null}
            </div>
            <div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={this.model.state.formData.lastName}
                onChange={this.controller.onChange}
                placeholder="Last Name..."
              />
              {this.model.state.formErrors.lastName ? (
                <span>{this.model.state.formErrors.lastName}</span>
              ) : null}
            </div>
          </div>
          <br />

          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={this.model.state.formData.email}
            onChange={this.controller.onChange}
            placeholder="Email..."
          />
          {this.model.state.formErrors.email ? (
            <span>{this.model.state.formErrors.email}</span>
          ) : null}
          <br />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.model.state.formData.password}
            onChange={this.controller.onChange}
            placeholder="Password..."
          />
          {this.model.state.formErrors.password ? (
            <span>{this.model.state.formErrors.password}</span>
          ) : null}

          <label htmlFor="biography">Biography:</label>
          <textarea
            id="biography"
            name="biography"
            value={this.model.state.formData.biography}
            onChange={this.controller.handleTextAreaChange}
            placeholder="Biography..."
          />
          {this.model.state.formErrors.biography ? (
            <span>{this.model.state.formErrors.biography}</span>
          ) : null}

          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={this.model.state.formData.dob}
            onChange={this.controller.onChange}
            placeholder="Date Of Birth..."
          />
          <br />
          {this.model.state.formErrors.dob ? <span>{this.model.state.formErrors.dob}</span> : null}

          <label htmlFor="favoriteColor">Favorite Color:</label>
          <input
            type="color"
            id="favoriteColor"
            name="favoriteColor"
            value={this.model.state.formData.favoriteColor}
            onChange={this.controller.onChange}
            placeholder="Favourite Color"
          />
          {this.model.state.formErrors.favoriteColor ? (
            <span>{this.model.state.formErrors.favoriteColor}</span>
          ) : null}
          <br />

          <div className="gender-inputs">
            <label htmlFor="gender">Male:</label>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={this.model.state.formData.gender === 'male'}
              onChange={this.controller.onChange}
              placeholder="Gender..."
            />
            <label htmlFor="gender">Female:</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={this.model.state.formData.gender === 'female'}
              onChange={this.controller.onChange}
              placeholder="Gender..."
            />
          </div>
          {this.model.state.formErrors.gender ? (
            <span>{this.model.state.formErrors.gender}</span>
          ) : null}

          <label htmlFor="termsAndServices">Agree to Terms And Services:</label>
          <input
            type="checkbox"
            id="termsAndServices"
            name="termsAndServices"
            checked={this.model.state.formData.termsAndServices}
            onChange={this.controller.handleCheckboxChange}
            placeholder="Terms and Services..."
          />
          <br />
          {this.model.state.formErrors.termsAndServices ? (
            <span>{this.model.state.formErrors.termsAndServices}</span>
          ) : null}
          <br />

          <input type="submit" value="Submit" />
        </FormStyled>
      </div>
    );
  }
}
