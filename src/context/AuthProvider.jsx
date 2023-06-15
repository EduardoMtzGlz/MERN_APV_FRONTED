import { useState, useEffect, createContext} from "react";
import clienteAxios from "../config/axios";
import usePacientes from "../hooks/usePacientes";


const AuthContext = createContext(); 


const AuthProvider = ({children}) => { //Children es por qué se aplica a todos sus hijos
    
    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({}); //Estos usan un state 
    
    useEffect(() => { //Cuando se carga se ejecuta este código 
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token'); //El token se guarda en local storage 
            
            if(!token){
                setCargando(false)
                return 
            }

            //Manda el token en forma de headers para mandar la petición
            const config = {
                headers: {
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${token}`
                }
            }

            try {
               const {data} = await clienteAxios('/veterinarios/perfil', config); 
               
               
               setAuth(data) // Guarda en el state la información de usuario autenticado              
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({}) //NO guarda la información en el state, en caso de error
            }

            setCargando(false);           
             
        }

        autenticarUsuario(); 
    }, []); 

    const cerrarSesion = () => {
        localStorage.removeItem("token"); 
        setAuth({})

    }

    

    const actualizarPerfil = async datos =>{
        const token = localStorage.getItem('token'); //El token se guarda en local storage 
            
        if(!token){
            setCargando(false)
            return 
        }

        //Manda el token en forma de headers para mandar la petición
        const config = {
            headers: {
                "Content-Type": "application/json", 
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const {data} = await clienteAxios.put(url, datos, config)
            return{
                msg:"Almacenado correctamente"
            }
        } catch (error) {
            return{
                msg: error.response.data.msg, 
                error: true
            }
        }


    }

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token'); //El token se guarda en local storage 
            
        if(!token){
            setCargando(false)
            return 
        }

        //Manda el token en forma de headers para mandar la petición
        const config = {
            headers: {
                "Content-Type": "application/json", 
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/actualizar-password`
            const {data} = await clienteAxios.put(url, datos, config); 
            return{
                msg:data.msg
            }
        } catch (error) {
            return{
                msg:error.response.data.msg, 
                error: true
            }
        }
    }


    return(
        <AuthContext.Provider
            value = {{
                auth, 
                setAuth, 
                cargando, 
                cerrarSesion, 
                actualizarPerfil, 
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext; 

// AuthContext.Provider hace que los elementos que están dentro de este código esten disponibles en otros sitios