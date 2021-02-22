import React, { useContext, useEffect, useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import groceryAutocomplete from '../services/grocery-product-autocomplete'
import { BehaviorSubject, Observable, pipe } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators'
import { GrocerySuggestion } from '../domain/GroceryAutocomplete'
import ItemsContext, { GroceryItem } from '../contexts/ItemsContext'

interface GroceryOptions {
  [id: string]: GrocerySuggestion
}
const GroceryOptionsFromSuggestions = (suggestions: GrocerySuggestion[] ) : GroceryOptions => {
  return Object.fromEntries( suggestions.map( (gs: GrocerySuggestion) => [gs.id, gs] ) )
}
  
const autoCompleteInput = new BehaviorSubject('')
const setAutoCompleteInput = (value: string): void => autoCompleteInput.next(value)

export default function SearchBar() {
  const itemsContext = useContext(ItemsContext)

  const [options, setOptions] = useState<GroceryOptions>({})
  const [selectedOptions, setSelectedOptions] = useState<GroceryOptions>({})

  const grocerySelectOptions: Observable<GrocerySuggestion[]> = autoCompleteInput.pipe(
    debounceTime(400),
    distinctUntilChanged(),
    switchMap(groceryAutocomplete)
  )

  useEffect(() => {
    grocerySelectOptions.subscribe((suggestions: GrocerySuggestion[]) => 
      setOptions(GroceryOptionsFromSuggestions(suggestions))
    )
  },[])

  useEffect(() => {
    itemsContext.updateItems(Object.values(selectedOptions))
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
            label="Search products"
          />
        )}
      />
      </div>
  )
}