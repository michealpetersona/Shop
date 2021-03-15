import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { Observable, EMPTY } from 'rxjs'
import { GroceryAutocomplete, GrocerySuggestion } from '../domain/GroceryAutocomplete'
import CONFIG from '../config'
import { AuthContextType } from '../contexts/AuthContext'

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
      }).catch( (error) => { 
        console.log(error)
        window.alert('Error polling server, please check pass code')
      })
  })
}

export default groceryAutocomplete