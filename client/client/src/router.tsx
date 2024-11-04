import {createBrowserRouter} from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import {action as deleteProductAction} from './components/ProductDetails'
import Products,{loader as productsLoader, action as updatetAvailabilityAction} from './views/Products'
import NewProduct,{action as newProductAction} from './views/NewProduct'
import EditProduct ,{action as editProduct, loader as EditproductLoader}from './views/EditProduct'
import RegisterView, {action as createAccount} from './views/auth/RegisterView'
import AuthLayout from './layouts/AuthLayout'
import Login from './views/auth/Login'
import ConfirmAccountView from './views/auth/ConfirmAccountView'
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
    },
    {
        path:'/auth',
        element:<AuthLayout/>,
        children:[
              //auth
              {
                path:'register',
                element:<RegisterView/>,
                action:createAccount
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'confirm-account',
                element:<ConfirmAccountView/>
            }

        ]
    }
    
 
    ]
)