import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { Observable, EMPTY } from 'rxjs'
import { GroceryAutocomplete, GrocerySuggestion } from '../domain/GroceryAutocomplete'

const options = (query: string) : AxiosRequestConfig => { return {
  method: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/suggest',
  params: {query: query, number: '10'},
  headers: {
    'x-rapidapi-key': '8bdc4d14bfmsh5bb07853bfbe3b1p1b793ejsn3f42a6fcc70b',
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
} }

const groceryAutocomplete = (query : string ) : Observable<GrocerySuggestion[]> => {
  if(query === null || query.trim() === '') { return EMPTY }
  return new Observable( (observer) => {
    axios.request(options(query))
      .then( (response: AxiosResponse<GroceryAutocomplete>) => {
        observer.next(response.data.results)
        observer.complete()
      })
  })
}

export default groceryAutocomplete