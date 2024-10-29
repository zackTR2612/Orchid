import { AuthContextProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

<AuthContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</AuthContextProvider>
