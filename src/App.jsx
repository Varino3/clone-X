// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'; // Ajusta la ruta según tu estructura de carpetas
import Header from './components/Header';
import Home from './pages/Home';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Agrega más rutas según sea necesario */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
