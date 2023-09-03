import React from 'react';
import {Routes, Route} from 'react-router-dom';

import WithSetRes from '../WithSetRes/WithSetRes';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';

import './App.css';


function App() {
  return (
    <>
      <WithSetRes element={Header} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
