import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext(); //Crea el context con el nombre de la variable

export const PacientesProvider = ({children}) => { //El que manda la información, utiliza children ya que esta varible será la que lleve la información de los componentes hijos del .Provider
    const {auth} = useAuth(); //Información de autenticación al poner como párametro en el useEffect evita recargar la página para que se muentren los datos adecuadamente

    const[pacientes, setPacientes] = useState([]); 
    const[paciente, setPaciente] = useState({});      

    useEffect(() => {
        const obtenerPacientes = async () => {
            
            try {

                const token = localStorage.getItem("token");
                if(!token) return; 

                const config = {
                    headers: {
                        "Content-Type": "application/json", 
                        Authorization: `Bearer ${token}`
                    }
                }; 

                const {data} = await clienteAxios("/pacientes", config)
                setPacientes(data);
                
            } catch (error) {
                console.log(error); 
            }
        }

        obtenerPacientes(); 

    }, [auth]); 

    const guardarPaciente = async paciente => {
        
        const token = localStorage.getItem("token"); 
        const config = {
            headers: {
                "Content-Type": "application/json", 
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id){
            try {
                const{data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)

                

                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)

                setPacientes(pacientesActualizado)

            } catch (error) {
                console.log(`Error ${error}`); 
            }
        }else{
            try {
                
                const {data} = await clienteAxios.post("/pacientes",paciente, config); 
    
                const{createdAt, updatedAt, __v, ...pacienteAlmacenado} = data; 
                setPacientes([pacienteAlmacenado, ...pacientes])
                 
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }     
    }

    const setEdicion = paciente => {
        setPaciente(paciente); 
    }

    const eliminarPaciente = async (nombre, id) => {
        const confirmar = confirm(`Se eliminará "${nombre}" del registro`)
        
        if(confirmar){
            try {
                const token = localStorage.getItem("token"); 
                const config = {
                    headers: {
                        "Content-Type": "application/json", 
                        Authorization: `Bearer ${token}`
                    }
                }    
                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config); 

                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id) //Se trae a todos los que son diferentes al seleccionado 

                setPacientes(pacientesActualizado)
               

            } catch (error) {
                console.log(error)
            }
        }     
       
    }



    return(
        <PacientesContext.Provider
            value={{
                pacientes, 
                guardarPaciente, 
                setEdicion, 
                paciente, 
                eliminarPaciente
            }}
        >
            {children} {/* componentes hijos de este provider */}
        </PacientesContext.Provider>
    )
}





export default PacientesContext 