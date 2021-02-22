import React, { useState, createContext, useEffect, useContext } from 'react'
import { BehaviorSubject, from, Observable, Subject } from 'rxjs'
import { filter, map, switchMap, tap } from 'rxjs/operators'
import { GrocerySuggestion } from '../domain/GroceryAutocomplete'
import GroceryProduct from '../domain/GroceryProduct'
import grocerySearch from '../services/grocery-product-search'
import AuthContext from './AuthContext'

export type GroceryItem = (GroceryProduct | GrocerySuggestion)
export interface GroceryItems {
  [id: string]: GroceryProduct
}

export interface ItemsContextType {
  items: GroceryItems
  updateItems: (id: GrocerySuggestion[]) => void
}
const ItemsContextStarter: ItemsContextType = {
  items: {},
  updateItems: (items: GrocerySuggestion[]) => {}
}
const ItemsContext = createContext(ItemsContextStarter)


export const ItemsContextProvider = ({ children }: {children: any}) => {
  const [items, setItems] = useState<GroceryItems>({})
  const [options, setOptions] = useState<GrocerySuggestion[]>([])

  const authContext = useContext(AuthContext)

  const myGrocerySearch = (id: number) : Promise<GroceryProduct> => {
    return grocerySearch(id, authContext.authCode)
  }
  
  const updateItems = (newItems: GrocerySuggestion[]) => {
    //remove items
    Object.values(items)
      .filter((val: GroceryProduct) => newItems.filter(x => x.id == val.id).length == 0)
      .map((val: GroceryProduct) => {
        const myItems = items
        delete myItems[val.id]
        setItems(myItems)
      })
    setOptions(newItems)
  }

  useEffect(() => {
    //add new items
    options
      .filter((val: GrocerySuggestion) => !items.hasOwnProperty(val.id))
      .map((val: GrocerySuggestion) => myGrocerySearch(val.id)
        .then((val: GroceryProduct) => setItems({...items, [val.id]: val}) ))

  },[options])
  
  return (
    <ItemsContext.Provider value={{items: items, updateItems: updateItems}}>
      {children}
    </ItemsContext.Provider>
  )
}

export default ItemsContext