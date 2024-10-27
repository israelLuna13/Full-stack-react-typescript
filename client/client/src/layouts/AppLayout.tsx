import { Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu";

export default function AppLayout() {
  return (
    <>
        <header className="bg-gray-800 py-5">
            <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                <div className="mx-auto max-w-6xl py-10">
                    <h1 className='text-4xl font-extrabold text-white'>Administrador de productos</h1>
                </div>
                <NavMenu/>
            </div>
        </header>
        <section className="max-m-scree-2xl max-auto mt-10 p-5">
            <Outlet/>
        </section>

        <footer className="py-5">
            <p className="text-center">
                Todos los derechos resersvados {new Date().getFullYear()}
            </p>
        </footer>
    
    </>
  )
}
