import React from 'react'
import logo from './logo.svg'
import SearchBar from './components/SearchBar'
import ShoppingList from './components/ShoppingList'
import Container from '@material-ui/core/Container'
import './App.css'
import { ItemsContextProvider } from './contexts/ItemsContext'
import { AuthContextProvider } from './contexts/AuthContext'
import PasswordBar from './components/PasswordBar'

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <PasswordBar/>
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
    </AuthContextProvider>
  )
}

export default App
