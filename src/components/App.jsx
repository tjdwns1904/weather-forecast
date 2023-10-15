import React, { useEffect, useState } from 'react';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Weather from './Weather';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/weather' element={<Weather/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
