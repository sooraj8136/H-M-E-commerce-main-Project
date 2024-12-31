import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/GlobalStyles.css'
import { store } from './redux/store.js'
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>
);
