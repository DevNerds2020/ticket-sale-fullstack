import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
// import './index.css';
import '../public/index.css';
import { Workbox } from 'workbox-window';

// service worker is only available in production mode
if ('serviceWorker' in navigator) {
    const wb = new Workbox('/service-worker.js');
    wb.register();
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);
