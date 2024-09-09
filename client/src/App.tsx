import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { SecurityTokenProvider } from './contexts/SecurityTokenContext'
import Router from './components/Router'

function App() {

  return (
    <BrowserRouter>
      <SecurityTokenProvider>
        <Router />
      </SecurityTokenProvider>
    </BrowserRouter>
  )
}

export default App
