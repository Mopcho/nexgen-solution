import { FormModel } from './FormModel';

export interface FormControllerProps {
  model: FormModel;
}

/**
 * The controller is responsible for business logic and updating the model
 */
export class FormController {
  model: FormModel;

  constructor(props: FormControllerProps) {
    this.model = props.model;
    this.onChange = this.onChange.bind(this);
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    this.model.setData({ ...this.model.state.formData, [name]: value });
  }

  handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    this.model.setData({ ...this.model.state.formData, [name]: checked });
  };

  handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    this.model.setData({ ...this.model.state.formData, [name]: value });
  };

  onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate
    const { firstName, lastName, email, password, biography, dob, termsAndServices, gender } =
      this.model.state.formData;

    if (firstName.length < 3) {
      this.model.setErrors({
        ...this.model.state.formErrors,
        firstName: 'Must be at least 3 characters long',
      });
    } else {
      this.model.setErrors({ ...this.model.state.formErrors, firstName: false });
    }

    if (lastName.length < 3) {
      this.model.setErrors({
        ...this.model.state.formErrors,
        lastName: 'Must be at least 3 characters long',
      });
    } else {
      this.model.setErrors({ ...this.model.state.formErrors, lastName: false });
    }

    if (password.length < 8) {
      this.model.setErrors({
        ...this.model.state.formErrors,
        password: 'Must be at least 8 characters long',
      });
    } else {
      this.model.setErrors({ ...this.model.state.formErrors, password: false });
    }

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      this.model.setErrors({ ...this.model.state.formErrors, email: 'Must be a valid email' });
    } else {
      this.model.setErrors({ ...this.model.state.formErrors, email: false });
    }

    if (biography.length < 20) {
      this.model.setErrors({
        ...this.model.state.formErrors,
        biography: 'Must be at least 20 characters long',
      });
    } else {
      this.model.setErrors({ ...this.model.state.formErrors, biography: false });
    }

    if (dob) {
      const today = new Date();
      const birthDate = new Date(dob);
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < 18) {
        this.model.setErrors({
          ...this.model.state.formErrors,
          dob: 'Must be at least 18 years old',
        });
      } else {
        this.model.setErrors({ ...this.model.state.formErrors, dob: false });
      }
    } else {
      this.model.setErrors({
        ...this.model.state.formErrors,
        dob: 'Must be a valid date of birth',
      });
    }

    if (gender !== 'male' && gender !== 'female') {
      this.model.setErrors({
        ...this.model.state.formErrors,
        gender: "Must be one of 'Female or Male'",
      });
    } else {
      this.model.setErrors({ ...this.model.state.formErrors, gender: false });
    }

    if (!termsAndServices) {
      this.model.setErrors({
        ...this.model.state.formErrors,
        termsAndServices: 'Must accept terms and services',
      });
    } else {
      this.model.setErrors({ ...this.model.state.formErrors, termsAndServices: false });
    }

    // If there are errors, end the execution here
    const areAllFalse = Object.values(this.model.state.formErrors).every(
      (value) => value === false
    );

    if (!areAllFalse) {
      return;
    }

    // Submit if no errors
    console.log('Validation Passed');
  };
}
