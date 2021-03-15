import React, { useState, createContext, useEffect, useContext } from 'react'
import { GrocerySuggestion } from '../domain/GroceryAutocomplete'
import GroceryProduct from '../domain/GroceryProduct'
import grocerySearch from '../services/grocery-product-search'
import AuthContext from '../contexts/AuthContext'

export interface GroceryProductCollection {
  [id: string]: GroceryProduct
}

export interface GroceryProductsContextType {
  groceryProducts: GroceryProductCollection
  updateGroceryProducts: (id: GrocerySuggestion[]) => void
}
const GroceryProductsContextStarter: GroceryProductsContextType = {
  groceryProducts: {},
  updateGroceryProducts: (groceryProducts: GrocerySuggestion[]) => {}
}
const GroceryProductsContext = createContext(GroceryProductsContextStarter)


export const GroceryProductsContextProvider = ({ children }: {children: any}) => {
  const [groceryProducts, setGroceryProducts] = useState<GroceryProductCollection>({})
  const [grocerySuggestions, setGrocerySuggestions] = useState<GrocerySuggestion[]>([])

  const authContext = useContext(AuthContext)

  const myGrocerySearch = (id: number) : Promise<GroceryProduct> => {
    return grocerySearch(id, authContext.getAuthCode())
  }
  
  const updateGrocerySuggestions = (newSuggestions: GrocerySuggestion[]) => {
    setGrocerySuggestions(newSuggestions)
  }

  const removeProductsNotInSuggestions = (grocerySuggestions: GrocerySuggestion[]) => {
    const suggestionsContainProduct = (product: GroceryProduct) : boolean => {
      return grocerySuggestions.filter(suggestion => suggestion.id == product.id).length > 0
    }

    let updatedProducts = {...groceryProducts}

    Object.values(groceryProducts)
      .filter((productInTable: GroceryProduct) => !suggestionsContainProduct(productInTable))
      .forEach((product: GroceryProduct) => delete updatedProducts[product.id])
    
    setGroceryProducts(updatedProducts)
  }

  const addProductsNewToSuggestions = (grocerySuggestions: GrocerySuggestion[]) => {
    grocerySuggestions
      .filter((suggestion: GrocerySuggestion) => !groceryProducts.hasOwnProperty(suggestion.id))
      .map((suggestion: GrocerySuggestion) => myGrocerySearch(suggestion.id))
      .forEach((productPromise: Promise<GroceryProduct>) => 
        productPromise.then((product: GroceryProduct) => setGroceryProducts({...groceryProducts, [product.id]: product}) )) 
  }

  useEffect(() => {
    removeProductsNotInSuggestions(grocerySuggestions)
    addProductsNewToSuggestions(grocerySuggestions)
  },[grocerySuggestions])
  
  return (
    <GroceryProductsContext.Provider value={
      {groceryProducts: groceryProducts, 
      updateGroceryProducts: updateGrocerySuggestions}}>
      {children}
    </GroceryProductsContext.Provider>
  )
}

export default GroceryProductsContext