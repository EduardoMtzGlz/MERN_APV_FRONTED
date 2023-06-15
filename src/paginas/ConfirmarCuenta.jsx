import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom" //Permite leer los parámetros de la url
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";


const ConfirmarCuenta = () => {
   const params = useParams(); 
   const {id}= params; 
   const [cuentaConfirmada, setCuentaConfirmada] = useState(false); 
   const [cargando, setCargando] = useState(true); 
   const [alerta, setAlerta] = useState({})
    
  useEffect(()=>{
    const confirmarCuenta = async () =>{
      try {
        const url=`/veterinarios/confirmar/${id}`
        const { data } = await clienteAxios(url);

        setCuentaConfirmada(true); 
        
        setAlerta({
          msg: data.msg
        })

      } catch (error) {
        setAlerta({msg: error.response.data.msg, error:true})
      }

      setCargando(false); 

    }

    confirmarCuenta(); //Se esta mandando a llamar la función previamente creada, en este caso para confirmar la cuenta
    
  }, []); //Con el paréntesis se ejecuta una sola vez


  return (
      <>
          <div >
            <h1 className="text-indigo-600 font-black text-5xl ">Confirma tu cuenta para administrar tus <span className="text-black">PACIENTES</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-4 py-5 rounded-xl bg-white">
            {!cargando && <Alerta 
              alerta= {alerta}
            /> 
            }  

            {cuentaConfirmada && (
              <Link 
                  className="block text-center my-2 text-gray-500"
                  to="/">Iniciar Sesión</Link>
            )}       
        </div>
      </>
    )
  }
  
  export default ConfirmarCuenta