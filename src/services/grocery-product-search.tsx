import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import GroceryProduct from '../domain/GroceryProduct'

const baseTemplate = (id: number) : string => `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/${id}`

const options = (id: number) : AxiosRequestConfig => { return {
  method: 'GET',
  url: baseTemplate(id),
  headers: {
    'x-rapidapi-key': '8bdc4d14bfmsh5bb07853bfbe3b1p1b793ejsn3f42a6fcc70b',
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
} }

const grocerySearch = async (id: number): Promise<GroceryProduct> => {
  let response: AxiosResponse<GroceryProduct> = await axios.request(options(id)).catch(
    (error) => { throw new Error('Error finding product info') })

  return response.data
}

export default grocerySearch