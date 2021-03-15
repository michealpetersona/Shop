import React, { useContext } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import GroceryProduct from '../domain/GroceryProduct'
import GroceryProductsContext, { GroceryProductsContextType } from '../contexts/GroceryProductsContext'

const ShoppingList = () => {
  const productsContext : GroceryProductsContextType = useContext(GroceryProductsContext)
  const groceryProducts = productsContext.groceryProducts

  if(groceryProducts === undefined || Object.keys(groceryProducts).length == 0) { return null }
  return ( 
  <TableContainer component={Paper} className="mt-2">
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
        <TableCell>Title</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>Aisle</TableCell>
        <TableCell>Ingredient Count</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
      {Object.keys(groceryProducts).map((key: string) => {
        const product: GroceryProduct = groceryProducts[key]
        const price = product.price > 0 ? 
          new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price/100)
          : 'N/A'

        return (
          <TableRow key={product.id}>
            <TableCell>
              {product.title}
            </TableCell>
            <TableCell>
              {price}
            </TableCell>
            <TableCell>
              {product.aisle}
            </TableCell>
            <TableCell>
              {product.ingredientCount}
            </TableCell>
          </TableRow>
        )
      })}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default ShoppingList