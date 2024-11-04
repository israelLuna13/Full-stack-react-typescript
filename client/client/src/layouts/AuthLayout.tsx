import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function AuthLayout() {
    return (
        <>

<div className='bg-gray-800 min-h-screen'>
            <div className='py-10 lg:py-20 mx-auto w-[450px]'>
                <div className='mt-10'>
                <Outlet/>
                </div>
            </div>
        </div>
    
            <footer className="py-5 bg-gray-800">
                <p className="text-center text-white">
                    Todos los derechos resersvados {new Date().getFullYear()}
                </p>
            </footer>
            
            {/* show notify */}
                <ToastContainer
                     pauseOnHover={false}
                     pauseOnFocusLoss={false}
                />
        </>
      )
}
