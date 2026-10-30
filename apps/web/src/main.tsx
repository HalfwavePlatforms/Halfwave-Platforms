import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/base.css';
import { ThemeProvider } from './components/ThemeProvider';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
