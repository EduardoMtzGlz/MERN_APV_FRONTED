import { Link, useLocation } from "react-router-dom"


const AdminNav = () => {
    const location = useLocation(); 
    
    const{pathname} = location

    const rutaPerfil = pathname.includes("perfil"); 
    const rutaPassword = pathname.includes("password"); 

    
    

  return (
    <nav className="flex gap-3 justify-center">
        <Link
            to="/admin/perfil"
            className={`${rutaPerfil ? "text-indigo-600 underline": "text-gray-500"} uppercase font-bold`}
            
        >Perfil</Link>

        <Link
            to="/admin/cambiar-password"
            className= {`${rutaPassword ? "text-indigo-600 underline": "text-gray-500"} uppercase font-bold`}
        >Cambiar Password</Link>
    </nav>
  )
}

export default AdminNav