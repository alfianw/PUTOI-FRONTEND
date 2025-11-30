// main.tsx
import './styles/globals.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './utils/auth-context';
import { MantineProvider } from "@mantine/core";


const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <MantineProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MantineProvider>
  </StrictMode>
);
