import React from 'react';
import './App.scss';
import PackageForm from './components/PackageForm';

function App() {
  return (
    <>
      <div className="background"></div>
      <div className="container">
        <div className="title">
            <h1>Parcels</h1>
            <p>Send your package with ease</p>
        </div>
        <PackageForm />
      </div>
    </>
  );
}

export default App;
