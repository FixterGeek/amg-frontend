import React from 'react';
import { Provider } from 'react-redux';
import 'moment/locale/es';

import store from './store/store';
import AppRouter from './routes/Router';

import './styles/App.scss';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
