import React from 'react';
import FormMVC from './views/Form';

function App() {
  return (
    <div className="container">
      <FormMVC.FormView model={FormMVC.model} controller={FormMVC.controller} />
    </div>
  );
}

export default App;
