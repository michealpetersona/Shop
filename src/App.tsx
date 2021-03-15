import React from 'react'
import logo from './logo.svg'
import SearchBar from './components/SearchBar'
import ShoppingList from './components/ShoppingList'
import Container from '@material-ui/core/Container'
import './App.css'
import { GroceryProductsContextProvider } from './contexts/GroceryProductsContext'
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
            <h3 className='text-align-left'>Type in the box below to find your favorite items for your grocery list!</h3>
            <GroceryProductsContextProvider>
              <SearchBar/>
              <ShoppingList/>
            </GroceryProductsContextProvider>
        </Container>
      </div>
    </AuthContextProvider>
  )
}

export default App
