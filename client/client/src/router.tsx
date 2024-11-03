import {createBrowserRouter} from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import {action as deleteProductAction} from './components/ProductDetails'
import Products,{loader as productsLoader, action as updatetAvailabilityAction} from './views/Products'
import NewProduct,{action as newProductAction} from './views/NewProduct'
import EditProduct ,{action as editProduct, loader as EditproductLoader}from './views/EditProduct'
const url =`products`
export const router = createBrowserRouter([
    {
        path:'/',
        element:<AppLayout/>,
        children:[
            {
                index:true,
                element:<Products/>,
                loader:productsLoader,
                action:updatetAvailabilityAction
            },

            {
                path:`${url}/new`,
                element:<NewProduct/>,
                action:newProductAction
            },
            {
                path:`${url}/:id/edit`,
                element:<EditProduct/>,
                loader:EditproductLoader,
                action:editProduct
            },
            {
                path:`${url}/:id/delete`,
                action:deleteProductAction
            }
        ]
    }
 
    ]
)