import React from 'react';
import Header from './components/Header'
import DateInput from './components/DateInput'
import Results from './components/Results'
import Footer from './components/Footer'
import { AsteroidsProvider } from './context/AsteroidsContext'


import './Bulma.css';

function App() {
  return (
    <>
        <AsteroidsProvider>
          <Header />
          <DateInput />
          <Results />
          <Footer />
        </AsteroidsProvider>
    </>
  );
}

export default App;

