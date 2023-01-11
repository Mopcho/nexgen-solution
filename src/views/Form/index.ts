import { FormController } from './FormController';
import { FormView } from './FormView';
import { FormModel } from './FormModel';
import PostBinService from '../../service/postbin';

export const postbinService = new PostBinService('https://enqbr0y95vpih.x.pipedream.net');
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
