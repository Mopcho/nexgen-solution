import { FormData } from '../views/Form/FormModel';

class PostBinService {
  constructor(postbinUrl: string) {
    this.postbinUrl = postbinUrl;
  }

  postbinUrl: string;

  getBin = async () => {
    try {
      const rawResponse = await fetch(this.postbinUrl);
      const response = await rawResponse.json();
      return response;
    } catch (err) {
      return err;
    }
  };

  postToBin = async (formData: FormData) => {
    try {
      const rawResponse = await fetch(this.postbinUrl, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response = await rawResponse.json();
      return response;
    } catch (err) {
      return err;
    }
  };
}

export default PostBinService;
