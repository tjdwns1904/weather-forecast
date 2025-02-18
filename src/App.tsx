import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Weather from './pages/Weather';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {

  return (
    <div className="App">
      <FavoritesProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/weather' element={<Weather />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </div>
  )
}

export default App
