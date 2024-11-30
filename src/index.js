import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import store from './redux/store';
import { Provider } from 'react-redux';
import { RootUserContextProvider } from './contexts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <RootUserContextProvider>
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <>
            <App />
            <ScrollToTop />
            <ToastContainer
              position="top-center"
            // theme="dark" 
            />
          </>
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  </RootUserContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();