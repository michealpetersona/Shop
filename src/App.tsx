import React from 'react'
import logo from './logo.svg'
import SearchBar from './components/SearchBar'
import ShoppingList from './components/ShoppingList'
import Container from '@material-ui/core/Container'
import './App.css'
import { ItemsContextProvider } from './contexts/ItemsContext'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Shop!</h1>
      </header>
      <Container maxWidth="lg">
        <ItemsContextProvider>
          <SearchBar/>
          <ShoppingList/>
        </ItemsContextProvider>
      </Container>
    </div>
  )
}

export default App
