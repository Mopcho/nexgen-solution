import { FormModel } from './FormModel';

export interface FormControllerProps {
  model: FormModel;
  pasteBinUrl: string;
}

/**
 * The controller is responsible for business logic and updating the model
 * It holds info about the model and the pasteBinUrl needed to make the requets
 */
export class FormController {
  model: FormModel;

  pasteBinUrl: string;

  constructor(props: FormControllerProps) {
    this.model = props.model;
    this.onChange = this.onChange.bind(this);
    this.pasteBinUrl = props.pasteBinUrl;
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

  /**
   * We first Validate the FormData in the model and if there areno errors
   * we proceed with making a POST request with the formData to the pasteBinUrl
   */
  onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // ** Start of Validation **
    const { firstName, lastName, email, password, biography, dob, termsAndServices, gender } =
      this.model.state.formData;

    // FirstName must be 3 characters long
    if (firstName.length < 3) {
      this.model.setErrors({
        ...this.model.state.formErrors,
        firstName: 'Must be at least 3 characters long',
      });
    } else {
      this.model.setErrors({ ...this.model.state.formErrors, firstName: false });
    }

    // LastName must be 3 characters long
    if (lastName.length < 3) {
      this.model.setErrors({
        ...this.model.state.formErrors,
        lastName: 'Must be at least 3 characters long',
      });
    } else {
      this.model.setErrors({ ...this.model.state.formErrors, lastName: false });
    }

    // Password must be 8 characters long
    if (password.length < 8) {
      this.model.setErrors({
        ...this.model.state.formErrors,
        password: 'Must be at least 8 characters long',
      });
    } else {
      this.model.setErrors({ ...this.model.state.formErrors, password: false });
    }

    // Email must be a valid email and pass the regex test
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      this.model.setErrors({ ...this.model.state.formErrors, email: 'Must be a valid email' });
    } else {
      this.model.setErrors({ ...this.model.state.formErrors, email: false });
    }

    // Biography must be at least 20 characters long
    if (biography.length < 20) {
      this.model.setErrors({
        ...this.model.state.formErrors,
        biography: 'Must be at least 20 characters long',
      });
    } else {
      this.model.setErrors({ ...this.model.state.formErrors, biography: false });
    }

    // User must be at least 18 years old and date should be valid
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

    // Gender should be either male or female
    if (gender !== 'male' && gender !== 'female') {
      this.model.setErrors({
        ...this.model.state.formErrors,
        gender: "Must be one of 'Female or Male'",
      });
    } else {
      this.model.setErrors({ ...this.model.state.formErrors, gender: false });
    }

    // User must accept terms and services
    if (!termsAndServices) {
      this.model.setErrors({
        ...this.model.state.formErrors,
        termsAndServices: 'Must accept terms and services',
      });
    } else {
      this.model.setErrors({ ...this.model.state.formErrors, termsAndServices: false });
    }
    // ** End of validation **

    // If there are errors, end the execution here
    const areAllFalse = Object.values(this.model.state.formErrors).every(
      (value) => value === false
    );

    if (!areAllFalse) {
      return;
    }

    try {
      // Here we are making a formData as PostBin blocks us with CORS, so we
      // are forced to use the 'no-cors' mode which allows us to send only
      // application/x-www-form-urlencoded or text/plain or multipart/form-data
      const formData = new FormData();
      formData.append('firstName', this.model.state.formData.firstName);
      formData.append('lastName', this.model.state.formData.lastName);
      formData.append('email', this.model.state.formData.email);
      formData.append('password', this.model.state.formData.password);
      formData.append('biography', this.model.state.formData.biography);
      formData.append('dob', this.model.state.formData.dob);
      formData.append('favoriteColor', this.model.state.formData.favoriteColor);
      formData.append('gender', this.model.state.formData.gender);
      formData.append('termsAndServices', this.model.state.formData.termsAndServices.toString());
      // Submit if no errors
      await fetch(this.pasteBinUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      // Clear fields
      this.model.setData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        biography: '',
        dob: '',
        favoriteColor: '',
        termsAndServices: false,
        gender: '',
      });
    }
  };
}
