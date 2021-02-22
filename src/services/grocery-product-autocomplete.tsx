import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { Observable, EMPTY } from 'rxjs'
import { GroceryAutocomplete, GrocerySuggestion } from '../domain/GroceryAutocomplete'
import CONFIG from '../config'

const options = (query: string, authCode : string) : AxiosRequestConfig => { return {
  method: 'GET',
  url: `${CONFIG.API}/products/suggest?query=${query}`,
  headers: {
    'Authorization': authCode
  }
} }

const groceryAutocomplete = (query : string, authCode : string) : Observable<GrocerySuggestion[]> => {
  if(query === null || query.trim() === '') { return EMPTY }
  return new Observable( (observer) => {
    axios.request(options(query, authCode))
      .then( (response: AxiosResponse<GroceryAutocomplete>) => {
        observer.next(response.data.results)
        observer.complete()
      })
  })
}

export default groceryAutocomplete