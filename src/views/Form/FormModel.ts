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

// The model's responsibility is to hold the state and when
// Changed by the Controller, to update the view
export class FormModel {
  state: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    biography: '',
    dob: '',
    favoriteColor: '#ffffff',
    termsAndServices: false,
    gender: '',
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
