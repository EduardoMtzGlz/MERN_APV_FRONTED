import { useState, useEffect } from "react"; //useEffect se ejecuta cuando el componente carga
import { useParams, Link } from "react-router-dom"; //Porque se requiere leer el contenido de la url
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [password, setPassword] = useState(''); 
  const [repetirPassword, setRepetirPassword] = useState(''); 
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false); 
  const [passwordModificado, setpasswordModificado] = useState(false); 

  const params = useParams(); 
  const {token} = params; 
  

  useEffect(() => { 
    const comprobarToken = async () => {      
      try {
        
        await clienteAxios(`/veterinarios/olvide-password/${token}`)
        setAlerta({
          msg: "Crea tu Nueva Contraseña"
        })
        setTokenValido(true)
        
      } catch (error) {
       
        setAlerta({
          msg: "Hubo un error con la URL", 
          error: true
        })
      }
      
    }

    comprobarToken(); 
  }, [])
  
  const handleSubmit = async e =>{
    e.preventDefault(); 

    if(password === ""){
      setAlerta({msg: "El password esta vacio", error:true}) 
      return; 
    }

    if(password !== repetirPassword){
      setAlerta({msg: "El Password no coincide", error:true}) 
      return; 
    } 

    if(password.length < 6){
      setAlerta({msg: "El password es muy corto, agrega mínimo 6 caracteres", error:true}) 
      return; 
    } 

    try {
      const url= `/veterinarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url, {
        password
      }); 

      setpasswordModificado(true); 

      setAlerta({
        msg: data.msg
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg, 
        error: true
      })
    }
  }  

  const cambiarVisibilidadPassword = () => {
    setPasswordVisible(!passwordVisible)
  }

  const {msg} = alerta; 

  return (
    <>
        <div >
            <h1 className="text-indigo-600 font-black text-5xl ">Registra tu nuevo  <span className="text-black">PASSWORD</span>
            </h1>
        </div>
        
        <div className="mt-20 md:mt-5 shadow-lg px-4 py-5 rounded-xl bg-white">        
          { msg && <Alerta
                alerta={alerta}
          />} 
          {tokenValido && (
            <> 
            <form
              onSubmit={handleSubmit}
            >
            <div className=" my-3">
                <label
                        className=" uppercase text-gray-600 block text-xl font-bold"
                    >
                        Nuevo Password
                    </label>
                    <input
                       type={passwordVisible ? 'text': 'password'}
                       placeholder="Tu Nuevo Password" 
                       className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                       value={password}
                       onChange = {e => setPassword(e.target.value)}
                    />
                </div>
                

                <div className=" my-3">
                <label
                        className=" uppercase text-gray-600 block text-xl font-bold"
                    >
                        Repetir Password
                    </label>
                    <input
                       type={passwordVisible ? 'text': 'password'}
                       placeholder="Repite tu Nuevo Password" 
                       className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                       value={repetirPassword}
                       onChange = {e => setRepetirPassword(e.target.value)}
                    />
                </div>
                <div className="flex flex-row-reverse">
                    <label
                        className=" mr-1"
                        >
                        Mostrar contraseñas
                    <input
                        type="checkbox"
                        className=" ml-2"
                        checked= {passwordVisible}
                        onChange= {cambiarVisibilidadPassword }
                    />
                    </label>
                </div>
                <input
                    type="submit"
                    value="Guardar Nuevo Password"
                    className="bg-indigo-700 rounded-xl w-full py-2 px-10 uppercase text-white font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                />  
            </form>
            {passwordModificado && <Link 
                    className="block text-center mt-5 text-gray-500"
                    to="/">Ya tengo una cuenta</Link>
            }
            </>
          )}

            
        </div>
    </>
  )
}

export default NuevoPassword