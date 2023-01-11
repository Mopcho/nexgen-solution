import { FormController } from './FormController';
import { FormView } from './FormView';
import { FormModel } from './FormModel';

const model = new FormModel();
const controller = new FormController({
  model,
  pasteBinUrl: 'https://www.toptal.com/developers/postbin/1673436302002-0560769881121',
});

const FormMVC = {
  model,
  controller,
  FormView,
};

export default FormMVC;
