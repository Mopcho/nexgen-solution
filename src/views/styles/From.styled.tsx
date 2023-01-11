import styled from 'styled-components';

const FormStyled = styled.form`
  width: 50%;
  margin: 0 auto;
  text-align: left;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f1faee;

  h3 {
    margin: 0 auto;
    padding: 20px 0;
    word-wrap: break-word;
  }

  span {
    color: red;
    margin-bottom: 10px;
  }

  label,
  p {
    font-weight: bold;
    display: block;
  }

  label[for='gender-male'],
  label[for='gender-female'] {
    display: inline-block;
  }
  input[type='radio'] {
    display: inline-block;
    margin-right: 10px;
  }

  input[type='text'],
  input[type='password'],
  textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
  }

  input[type='submit'] {
    background-color: #4caf50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: auto;
    margin: 20px 0;

    &:hover {
      background-color: #003566;
      color: #4caf50;

      transform: scaleX(1.1) scaleY(1.1);
    }
  }

  .names-container {
    display: flex;
    gap: 30px;
  }

  .gender-inputs {
    display: flex;
  }

  textarea {
    width: 100%;
    height: 200px;
    resize: none;
  }

  label[for='gender-male'],
  label[for='gender-female'] {
    display: inline-block;
  }
  input[type='radio'] {
    display: inline-block;
    margin: 0px 20px;
  }

  .form-field {
    padding: 15px 0px;
  }

  input[for='termsAndServices'] {
    margin-left: 5px;
  }
`;

export default FormStyled;
