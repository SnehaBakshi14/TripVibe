import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { TripProvider } from './contexts/TripContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TripProvider>
        <App />
      </TripProvider>
    </ThemeProvider>
  </StrictMode>
);