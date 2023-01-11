class PostBinService {
  constructor(postbinUrl: string) {
    this.postbinUrl = postbinUrl;
  }

  postbinUrl: string;

  getBin = async () => {
    try {
      const rawResponse = await fetch(this.postbinUrl, { mode: 'no-cors' });
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
        mode: 'no-cors',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
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
