import React, { useContext, useEffect, useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import groceryAutocomplete from '../services/grocery-product-autocomplete'
import { BehaviorSubject, from, Observable, pipe } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators'
import { GrocerySuggestion } from '../domain/GroceryAutocomplete'
import GroceryProductsContext, { GroceryProductsContextType } from '../contexts/GroceryProductsContext'
import AuthContext from '../contexts/AuthContext'

interface GroceryOptions {
  [id: string]: GrocerySuggestion
}
const GroceryOptionsFromSuggestions = (suggestions: GrocerySuggestion[] ) : GroceryOptions => {
  return Object.fromEntries( suggestions.map( (gs: GrocerySuggestion) => [gs.id, gs] ) )
}
  
const autoCompleteInput = new BehaviorSubject('')
const setAutoCompleteInput = (value: string): void => autoCompleteInput.next(value)

export default function SearchBar() {
  const productsContext : GroceryProductsContextType = useContext(GroceryProductsContext)

  const [options, setOptions] = useState<GroceryOptions>({})
  const [selectedOptions, setSelectedOptions] = useState<GroceryOptions>({})

  const authContext = useContext(AuthContext)

  const myGroceryAutocomplete = (query: string) : Observable<GrocerySuggestion[]> => {
    return groceryAutocomplete(query, authContext.getAuthCode())
  }

  const grocerySelectOptions: Observable<GrocerySuggestion[]> = autoCompleteInput.pipe(
    debounceTime(400),
    distinctUntilChanged(),
    switchMap(myGroceryAutocomplete)
  )

  useEffect(() => {
    grocerySelectOptions.subscribe((suggestions: GrocerySuggestion[]) => 
      setOptions(GroceryOptionsFromSuggestions(suggestions))
    )
  },[])

  useEffect(() => {
    productsContext.updateGroceryProducts(Object.values(selectedOptions))
  },[selectedOptions])

  return (
    <div className="mt-2">
      <Autocomplete
        multiple
        id="tags-standard"
        filterSelectedOptions={true}
        options={Object.values(options).concat(Object.values(selectedOptions)) }
        getOptionLabel={(option: GrocerySuggestion) => option.title}
        onChange={(event, value: GrocerySuggestion[], reason: string) => { 
          setSelectedOptions(GroceryOptionsFromSuggestions(value)) 
        }}
        onInputChange={(event, value) => setAutoCompleteInput(value) }
        renderInput={(params: object) => (
          <TextField
            {...params}
            variant="standard"
            label="Search grocery products"
          />
        )}
      />
      </div>
  )
}