import { FormController } from './FormController';
import { FormView } from './FormView';
import { FormModel } from './FormModel';

const model = new FormModel();
const controller = new FormController({ model });

export const FormMVC = {
  model,
  controller,
  FormView,
};
