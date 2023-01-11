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
    this.model.setData({ ...this.model.state, [name]: value });
  }

  handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    this.model.setData({ ...this.model.state, [name]: checked });
  };

  handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    this.model.setData({ ...this.model.state, [name]: value });
  };

  onSubmit(event: React.FormEvent) {
    event.preventDefault();
  }
}
