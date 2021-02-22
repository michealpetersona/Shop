import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import GroceryProduct from '../domain/GroceryProduct'
import CONFIG from '../config'

const baseTemplate = (id: number) : string => `${CONFIG.API}/products/?id=${id}`

const options = (id: number, authCode : string) : AxiosRequestConfig => { return {
  method: 'GET',
  url: baseTemplate(id),
  headers: {
    'Authorization': authCode
  }
} }

const grocerySearch = async (id: number, authCode : string): Promise<GroceryProduct> => {
  let response: AxiosResponse<GroceryProduct> = await axios.request(options(id, authCode)).catch(
    (error) => { throw new Error('Error finding product info') })

  return response.data
}

export default grocerySearch