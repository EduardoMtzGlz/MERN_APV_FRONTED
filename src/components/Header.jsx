import { Link } from "react-router-dom"; 
import useAuth from "../hooks/useAuth";

const Header = () => {

    const {cerrarSesion} = useAuth(); 

  return (
    <header className="py-10 md:bg-indigo-600  bg-black ">
        <div className="container mx-auto flex flex-col text-center lg:flex lg:items-center lg:flex-row lg:justify-between">
            <h1 className="md:uppercase font-bold text-2xl text-indigo-200">Administrador de Pacientes de {" "} <span className=" text-white">Veterinaria</span>
            </h1>

            <nav className=" p-3 flex gap-6 justify-center  md:justify-center md:flex md:gap-4 ">
                <Link to="/admin" className="text-white text-xl hover:text-gray-300">Pacientes</Link>
                <Link to="/admin/perfil" className="text-white text-xl hover:text-gray-300">Perfil</Link>
                <button
                    type="button"
                    className="text-white text-xl hover:text-gray-300"
                    onClick={cerrarSesion}
                >Cerrar Sesión</button>
            </nav>
        </div>
    </header>
  )
}

export default Header