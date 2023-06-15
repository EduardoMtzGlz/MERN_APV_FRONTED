import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth; 

//Creado exclusivamente para la verificación. Utiliza 