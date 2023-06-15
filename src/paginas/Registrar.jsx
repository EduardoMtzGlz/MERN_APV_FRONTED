import { useState } from "react"; 
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [telefono, setTelefono] = useState(""); 
    const [repetirPassword, setRepetirPassword] = useState(''); 
    const [passwordVisible, setPasswordVisible] = useState(false); 
    const [alerta, setAlerta] = useState({}); 
    
    

    
    const handleSubmit = async e => {
        e.preventDefault(); 
        if([nombre, email,password,repetirPassword, telefono].includes('')){
            setAlerta({msg: "Hay campos vacios", error:true}) 
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

        //Crear el usuario en la API 
        try {
            
            await clienteAxios.post(`/veterinarios`, {nombre, email, password, telefono}); 
            setAlerta({msg: "Registrado correctamente, revisa tu email", error: false});

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg, 
                error: true
            }) 
        }

    }

    const {msg} = alerta; 

    const cambiarVisibilidadPassword = () => {
        setPasswordVisible(!passwordVisible)
    }

    return (
      <>
        <div >
            <h1 className="text-indigo-600 font-black text-5xl ">Registrate, es  <span className="text-black">GRATIS</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-4 py-5 rounded-xl bg-white">

            { msg && <Alerta
                alerta={alerta}
            />
            }
            <form
                onSubmit={handleSubmit}
            >

            <div className="my-3">
                    <label
                        className=" uppercase text-gray-600 block text-xl font-bold"
                    >
                        Nombre
                    </label>
                    <input
                       type="text"
                       placeholder="Tu Nombre" 
                       className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                       value={nombre}
                       onChange = {e => setNombre(e.target.value)}
                    />
                </div>

                <div className="my-3">
                    <label
                        className=" uppercase text-gray-600 block text-xl font-bold"
                    >
                        Email
                    </label>
                    <input
                       type="email"
                       placeholder="Email de Registro" 
                       className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                       value={email}
                       onChange = {e => setEmail(e.target.value)}
                    />
                </div>

                <div className="my-3">
                    <label
                        className=" uppercase text-gray-600 block text-xl font-bold"
                    >
                        Teléfono
                    </label>
                    <input
                       type="tel"
                       placeholder="Teléfono de Registro" 
                       className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                       value={telefono}
                       onChange = {e => setTelefono(e.target.value)}
                    />
                </div>

                <div className=" my-3">
                <label
                        className=" uppercase text-gray-600 block text-xl font-bold"
                    >
                        Password
                    </label>
                    <input
                       type={passwordVisible ? 'text': 'password'}
                       placeholder="Tu Password" 
                       className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                       value={password}
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

                <div className=" my-3">
                <label
                        className=" uppercase text-gray-600 block text-xl font-bold"
                    >
                        Repetir Password
                    </label>
                    <input
                       type="password"
                       placeholder="Repite tu Password" 
                       className=" border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                       value={repetirPassword}
                       onChange = {e => setRepetirPassword(e.target.value)}
                    />
                </div>
                

                <input
                    type="submit"
                    value="Registrar"
                    className="bg-indigo-700 rounded-xl w-full py-2 px-10 uppercase text-white font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link 
                    className="block text-center my-2 text-gray-500"
                    to="/">Ya tengo una cuenta</Link>
                <Link 
                    className="block text-center my-2 text-gray-500"
                    to="/olvide-password">Olvide mi password</Link>
            </nav>
        </div>
      </>
    )
  }
  
  export default Registrar