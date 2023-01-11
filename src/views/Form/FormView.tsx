import React from 'react';
import FormStyled from '../styles/From.styled';
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

  // On mount, we subscribe our updateState function to
  // the model so whenever the model changes state
  // the view will change its state too in order ro
  // trigger a rerender
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
          <h3>PostBin Url : https://requestbin.com/r/enqbr0y95vpih/2KBWiULx9uV9AJw2Cgo8bHKyI1u</h3>
          <p>Your Name : </p>
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

          <div className="form-field">
            <label htmlFor="email">
              Email:
              <input
                type="text"
                id="email"
                name="email"
                value={this.model.state.formData.email}
                onChange={this.controller.onChange}
                placeholder="Email..."
              />
            </label>
            {this.model.state.formErrors.email ? (
              <span>{this.model.state.formErrors.email}</span>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                value={this.model.state.formData.password}
                onChange={this.controller.onChange}
                placeholder="Password..."
              />
            </label>
            {this.model.state.formErrors.password ? (
              <span>{this.model.state.formErrors.password}</span>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="biography">
              Biography:
              <textarea
                id="biography"
                name="biography"
                value={this.model.state.formData.biography}
                onChange={this.controller.handleTextAreaChange}
                placeholder="Biography..."
              />
            </label>
            {this.model.state.formErrors.biography ? (
              <span>{this.model.state.formErrors.biography}</span>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="dob">
              Date of Birth:
              <input
                type="date"
                id="dob"
                name="dob"
                value={this.model.state.formData.dob}
                onChange={this.controller.onChange}
                placeholder="Date Of Birth..."
              />
            </label>
            {this.model.state.formErrors.dob ? (
              <span>{this.model.state.formErrors.dob}</span>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="favoriteColor">
              Favorite Color:
              <input
                type="color"
                id="favoriteColor"
                name="favoriteColor"
                value={this.model.state.formData.favoriteColor}
                onChange={this.controller.onChange}
                placeholder="Favourite Color"
              />
            </label>
            {this.model.state.formErrors.favoriteColor ? (
              <span>{this.model.state.formErrors.favoriteColor}</span>
            ) : null}
          </div>

          <div className="form-field">
            <div className="gender-inputs">
              <label htmlFor="gender">
                Male:
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={this.model.state.formData.gender === 'male'}
                  onChange={this.controller.onChange}
                  placeholder="Gender..."
                />
              </label>
              <label htmlFor="gender">
                Female:
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={this.model.state.formData.gender === 'female'}
                  onChange={this.controller.onChange}
                  placeholder="Gender..."
                />
              </label>
            </div>
            {this.model.state.formErrors.gender ? (
              <span>{this.model.state.formErrors.gender}</span>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="termsAndServices">
              Agree to Terms And Services:
              <input
                type="checkbox"
                id="termsAndServices"
                name="termsAndServices"
                checked={this.model.state.formData.termsAndServices}
                onChange={this.controller.handleCheckboxChange}
                placeholder="Terms and Services..."
              />
            </label>
            {this.model.state.formErrors.termsAndServices ? (
              <span>{this.model.state.formErrors.termsAndServices}</span>
            ) : null}
          </div>

          <input type="submit" value="Submit" />
        </FormStyled>
      </div>
    );
  }
}
