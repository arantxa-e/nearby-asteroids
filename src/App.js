import React from 'react';
import Header from './components/Header'
import DateInput from './components/DateInput'
import Results from './components/Results'
import { AsteroidsProvider } from './context/AsteroidsContext'


import './Bulma.css';

function App() {
  return (
    <>
        <AsteroidsProvider>
          <Header />
          <DateInput />
          <Results />
        </AsteroidsProvider>
    </>
  );
}

export default App;

