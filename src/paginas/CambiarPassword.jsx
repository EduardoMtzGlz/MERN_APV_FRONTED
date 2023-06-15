import { useState } from "react";
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth";


const CambiarPassword = () => {
  const [password, setPassword]= useState({
    pwd_actual: "", 
    pwd_nuevo: ""
  });  

  const {guardarPassword} = useAuth(); 
  const [alerta, setAlerta] = useState({}); 
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {msg}= alerta; 

  const handleSubmit = async e => {
        e.preventDefault(); 
        if(Object.values(password).some(campo => campo === "")){
            setAlerta({
                msg:"Todos los campos son obligatorios", 
                error:true
            }); 
            return
        }

        if( password.pwd_nuevo.length < 6){
            setAlerta({
                msg: "El password debe tener más de 6 caracteres", 
                error: true
            })
        }

        const respuesta = await guardarPassword(password); 
        setAlerta(respuesta); 
        e.target.reset(); 
    }

  const cambiarVisibilidadPassword = () => {
    setPasswordVisible(!passwordVisible)
}
  return (
    <>
        <AdminNav/>

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl text-center mt-5 mb-10">Modifica tu {" "} <span className="text-indigo-600 font-bold">Password</span> aquí</p>

        <div className="flex justify-center">
            <div className="w-full md:w-3/5 bg-white shadow rounded-lg p-5">
                {msg && <Alerta alerta={alerta}/>}
                <form 
                    onSubmit={handleSubmit}
                >
                    <div className="my-3">
                        <p className=" mb-4 text-right text-sm">Los campos marcados con <span className="text-indigo-600 font-bold">*</span> son <span className="text-indigo-600 font-bold">obligatorios</span></p>
                        <label className="uppercase font-bold text-gray-600" htmlFor="pwd_actual">Password Actual*</label>
                        <input
                            id="pwd_actual"
                            type={passwordVisible ? 'text': 'password'}
                            className="border bg-gray-50 w-full p-2 my-5 rounded-lg"
                            name="pwd_actual"
                            placeholder="Escribe tu password actual"
                            onChange={e => setPassword({
                                ...password,
                                [e.target.name] : e.target.value
                            })}
                            
                        />
                    </div>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600" htmlFor="pwd_nuevo">Password Nuevo *</label>
                        <input
                            id="pwd_nuevo"
                            type={passwordVisible ? 'text': 'password'}
                            className="border bg-gray-50 w-full p-2 my-5 rounded-lg"
                            name="pwd_nuevo"
                            placeholder="Escribe tu nuevo password"
                            onChange={e => setPassword({
                                ...password,
                                [e.target.name] : e.target.value
                            })}
                            
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
                        onChange= {() => {cambiarVisibilidadPassword()}}
                    />
                    </label>
                </div>

                    <input
                        type="submit"
                        value="Actualizar Password"
                        className=" bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-800 hover:cursor-pointer"
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword