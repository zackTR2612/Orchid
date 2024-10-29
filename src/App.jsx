import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './Context/AuthContext'; 
import Navigation from './Components/Navigation/Navigation';
import { Orchid } from './Components/Orchid/Orchid';
import Detail from './Components/Detail/Detail';
import Contact from './Components/Contact/Contact';
import Special from './Components/Special/Special';
import Login from './Login/Login';
import Reg from './Register/Reg';
import Protected from './Firebase/Protect';
import OrchidList from './Components/Data/OrchidsList';
import Footer from './Components/Footer/Foot';

const App = () => {
  const [theme, setTheme] = useState('light'); 

  return (
    <AuthContextProvider> 
      <Router>
        <div className={`con ${theme}`}>
          <Navigation theme={theme} setTheme={setTheme} />
          <Routes>
            <Route path='/' element={<Orchid />} />
            <Route path='/orchids' element={<OrchidList/>} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='/contact' element={<Contact />} />
            <Route path="/special" element={<Special />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Reg />} />
          </Routes>
          <Footer theme={theme} />
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
