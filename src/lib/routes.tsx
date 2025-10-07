import Home from '@/pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Weather from '@/pages/Weather';

export default function RouteProvider(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/weather' element={<Weather />} />
      </Routes>
    </BrowserRouter>
  )
}