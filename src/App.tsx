import React from 'react';
import { FormMVC } from './views/Form';

export const App = () => {
  return (
    <>
      <div className="container">
        <FormMVC.FormView model={FormMVC.model} controller={FormMVC.controller}></FormMVC.FormView>
      </div>
    </>
  );
};
