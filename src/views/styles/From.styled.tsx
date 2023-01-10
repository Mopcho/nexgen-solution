import styled from 'styled-components';

export const FormStyled = styled.form`
  width: 50%;
  margin: 0 auto;
  text-align: left;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f1faee;

  label {
    font-weight: bold;
    display: block;
    margin: 5px 0px;
  }

  label[for='gender-male'],
  label[for='gender-female'] {
    display: inline-block;
  }
  input[type='radio'] {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  input[type='text'],
  input[type='password'],
  textarea {
    padding: 10px;
    margin-bottom: 15px;
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
  }

  textarea {
    width: 100%;
    height: 200px;
    resize: none;
  }
`;
