import { postbinService } from '.';
import { FormController } from './FormController';
import { FormModel } from './FormModel';

test('onChange should update the formData in the model', () => {
  const model = new FormModel();
  const controller = new FormController({ model, postbinService });
  const event = {
    target: {
      name: 'firstName',
      value: 'John',
    },
  };
  controller.onChange(event as React.ChangeEvent<HTMLInputElement>);
  expect(model.state.formData.firstName).toBe('John');
});

test('handleCheckboxChange should update the formData in the model', () => {
  const model = new FormModel();
  const controller = new FormController({ model, postbinService });
  const event = {
    target: {
      name: 'termsAndServices',
      checked: true,
    },
  };
  controller.handleCheckboxChange(event as React.ChangeEvent<HTMLInputElement>);
  expect(model.state.formData.termsAndServices).toBe(true);
});

test('onSubmit should set form errors in the model when the form data is invalid', () => {
  const model = new FormModel();
  const controller = new FormController({ model, postbinService });
  controller.onSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent);
  expect(model.state.formErrors.firstName).toBe('Must be at least 3 characters long');
  expect(model.state.formErrors.lastName).toBe('Must be at least 3 characters long');
});

test('onSubmit should set form errors to false when the form data is valid', () => {
  const model = new FormModel();
  const controller = new FormController({ model, postbinService });
  model.setData({
    ...model.state.formData,
    firstName: 'John',
    lastName: 'Doe',
    password: 'password',
    email: 'john@doe.com',
    biography: 'A long biography',
    dob: '01-01-1990',
  });
  controller.onSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent);
  expect(model.state.formErrors.firstName).toBe(false);
  expect(model.state.formErrors.lastName).toBe(false);
});

test('onSubmit should check email correctly and sets error message for invalid email', () => {
  const model = new FormModel();
  const controller = new FormController({ model, postbinService });
  model.setData({
    ...model.state.formData,
    email: 'john',
  });
  controller.onSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent);
  expect(model.state.formErrors.email).toBe('Must be a valid email');
});

test('onSubmit should check age correctly and sets error message for age under 18', () => {
  const model = new FormModel();
  const controller = new FormController({ model, postbinService });
  const dob = new Date().toISOString().slice(0, 10);
  model.setData({
    ...model.state.formData,
    dob,
  });
  controller.onSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent);
  expect(model.state.formErrors.dob).toBe('Must be at least 18 years old');
});

test('onSubmit should check for empty fields correctly and sets error messages', () => {
  const model = new FormModel();
  const controller = new FormController({ model, postbinService });
  controller.onSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent);
  expect(model.state.formErrors.firstName).toBe('Must be at least 3 characters long');
  expect(model.state.formErrors.lastName).toBe('Must be at least 3 characters long');
  expect(model.state.formErrors.email).toBe('Must be a valid email');
  expect(model.state.formErrors.password).toBe('Must be at least 8 characters long');
  expect(model.state.formErrors.biography).toBe('Must be at least 20 characters long');
  expect(model.state.formErrors.dob).toBe('Must be a valid date of birth');
});
