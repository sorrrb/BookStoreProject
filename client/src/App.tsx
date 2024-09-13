import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router/Router';
import { AccessTokenProvider } from './contexts/AccessTokenContext';
import './App.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <AccessTokenProvider>
          <Router />
        </AccessTokenProvider>
      </BrowserRouter>
    </>
  )
}

export default App
