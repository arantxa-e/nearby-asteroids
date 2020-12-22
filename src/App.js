import React from 'react';
import Header from './components/Header';
import DateInput from './components/DateInput';

import './Bulma.css';

function App() {
  return (
    <>
    <Header />
      <section className="section">
        <div className="container">
          <DateInput />
        </div>
      </section>
    </>
  );
}

export default App;

