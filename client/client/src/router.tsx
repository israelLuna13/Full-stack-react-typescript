import {createBrowserRouter} from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Products from './views/Products'
import NewProduct,{action as newProductAction} from './views/NewProduct'

export const router = createBrowserRouter([
    //route 
    {
        path:'/',
        element:<AppLayout/>,
        children:[
            {
                index:true,
                element:<Products/>
            },
            {
                path:'products/new',
                element:<NewProduct/>,
                action:newProductAction
            }
        ]
    }
 
    ]
)