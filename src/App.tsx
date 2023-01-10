import React from 'react';
import FormMvc from './views/Form/Form';

export const App = () => {
  return (
    <>
      <div className="container">
        <FormMvc.FormView model={FormMvc.model} controller={FormMvc.controller}></FormMvc.FormView>
      </div>
    </>
  );
};
