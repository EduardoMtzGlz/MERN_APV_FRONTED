import { Link , useNavigate } from "react-router-dom"; //useNavigate redirecciona al usuario
import { useState } from "react";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

const Login = () => {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [alerta, setAlerta] = useState({});

    const {setAuth} = useAuth(); 
    
    const navigate = useNavigate(); 


    const handleSubmit = async e => {
        e.preventDefault(); 

        if(password === "" && email === "" ){
            setAlerta({msg: "Introduce tus datos", error: true}); 
            return; 
        }

        if(email === ""){
            setAlerta({msg: "El correo electrónico esta vacio", error: true}); 
            return; 
        }

        if(password === ""){
            setAlerta({msg: "El password esta vacio", error: true}); 
            return; 
        }

        try {
            const {data} = await clienteAxios.post("/veterinarios/login", {
                email, 
                password
            }); 

            //Almacenando el token en localStorage
            localStorage.setItem('token', data.token); 

            //Almacenando la autorización en data
            
            setAuth(data)// Ojo setAut es el nombre de la variable que se extrae de useAuth

            //Redireccionar al usuario hacia /admin, en caso de que este correcta la autenticación 
            navigate("/admin"); 
            
        } catch (error) {
            setAlerta({
                msg: "Hubo un error",  
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
            <h1 className="text-indigo-600 font-black text-5xl ">Inicia Sesión y Administra tus <span className="text-black">Pacientes</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-4 py-5 rounded-xl bg-white">
            <form
                onSubmit={handleSubmit}
            >
            { msg && <Alerta
                alerta={alerta}
            />            }
                <div className="my-5">
                    <label
                        className=" uppercase text-gray-600 block text-xl font-bold"
                    >
                        Email
                    </label>
                    <input
                       value={email} 
                       type="email"
                       placeholder="Email de Registro" 
                       className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                       onChange = {e => setEmail(e.target.value)}
                    />
                </div>

                <div className=" my-3">
                <label
                        className=" uppercase text-gray-600 block text-xl font-bold"
                    >
                        Password
                    </label>
                    <input
                       value={password}  
                       type={passwordVisible ? 'text': 'password'}
                       placeholder="Tu Password" 
                       className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                       onChange = {e => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex flex-row-reverse">
                    <label
                        className=" mr-1"
                        >
                        Mostrar contraseña
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
                    value="Iniciar Sesión"
                    className="bg-indigo-700 rounded-xl w-full py-2 px-10 uppercase text-white font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link 
                    className="block text-center my-2 text-gray-500"
                    to="/registrar">¿No tienes una cuenta? Registrate</Link>
                <Link 
                    className="block text-center my-2 text-gray-500"
                    to="/olvide-password">Olvide mi password</Link>
            </nav>
        </div>
         
      </>
    )
  }
  
export default Login
