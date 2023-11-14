// App.jsx (u otro componente)
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Header from './components/Header';
import Home from './pages/Home';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Home />
      </div>
    </Provider>
  );
};

export default App;
