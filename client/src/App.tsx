import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Search from './components/Search'
import BookDetails from './components/BookDetails'
import Bookshelf from './components/Bookshelf'
import Signin from './components/Signin'
import Router from './components/Router'

function App() {

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App

/*
<Search />

<BookDetails 
  title="Horror and the Horror Film" 
  authors={["Bruce F. Kawin"]}
  description="'Horror and the Horror Film' is a vivid, compelling, insightful and well-written study of the horror film and its subgenres from 1896 to the present, concentrating on the nature of horror in reality and on film."
  publisher="Anthem Press"
  publicationDate={2012} />

<Bookshelf />

<Signin />
*/