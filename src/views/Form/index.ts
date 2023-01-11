import { FormController } from './FormController';
import { FormView } from './FormView';
import { FormModel } from './FormModel';
import PostBinService from '../../service/postbin';

export const postbinService = new PostBinService(
  'https://www.toptal.com/developers/postbin/1673447331127-9832910569384'
);
const model = new FormModel();
const controller = new FormController({
  model,
  postbinService,
});

const FormMVC = {
  model,
  controller,
  FormView,
};

export default FormMVC;
