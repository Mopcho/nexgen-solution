export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  biography: string;
  dob: string;
  favoriteColor: string;
  termsAndServices: boolean;
  gender: string;
}

export interface FormErrors {
  firstName: string | false;
  lastName: string | false;
  email: string | false;
  password: string | false;
  biography: string | false;
  dob: string | false;
  favoriteColor: string | false;
  termsAndServices: string | false;
  gender: string | false;
}

export interface FormModelState {
  formData: FormData;
  formErrors: FormErrors;
}

// The model's responsibility is to hold the state
export class FormModel {
  state: FormModelState = {
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      biography: '',
      dob: '',
      favoriteColor: '#ffffff',
      termsAndServices: false,
      gender: '',
    },
    formErrors: {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      biography: false,
      dob: false,
      favoriteColor: false,
      termsAndServices: false,
      gender: false,
    },
  };

  // We use a subscriber pattern here in order for the view
  // to be able to subscribe a updateView function
  // and when a state change occurs to execute it
  // ! an alternative is using Redux !
  subscribers: Array<(formState: FormModelState) => void> = [];

  subscribe = (fn: (formState: FormModelState) => void) => {
    this.subscribers.push(fn);
  };

  unsubscribe = (fn: (formState: FormModelState) => void) => {
    this.subscribers.filter((sub) => sub !== fn);
  };

  setData = (data: FormData) => {
    this.state.formData = { ...data };
    // Here we call all subscibed functions and execute them
    for (let i = 0; i < this.subscribers.length; i += 1) {
      this.subscribers[i]({ formData: data, formErrors: this.state.formErrors });
    }
  };

  setErrors = (data: FormErrors) => {
    this.state.formErrors = { ...data };
    // Here we call all subscibed functions and execute them
    for (let i = 0; i < this.subscribers.length; i += 1) {
      this.subscribers[i]({ formData: this.state.formData, formErrors: data });
    }
  };
}
