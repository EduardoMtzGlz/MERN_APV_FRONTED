import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav"; 
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {
    
    const {auth, actualizarPerfil}= useAuth(); //Contiene los datos de autenticación      

    const [perfil, setPerfil] = useState({}); //State local 
    const [alerta, setAlerta]= useState({})

    useEffect(()=> {
        setPerfil(auth) 
    }, [auth]) //Auth va como dependencia ya que de ahí se tomarán los datos 
    
    const handleSubmit = async e => {
        e.preventDefault(); 

        const {nombre, email, telefono} = perfil; 

        if([nombre, email, telefono].includes("")){
            setAlerta({
                msg:"Hay campos vacios", 
                error:true
            })
            return; 
        }

        const resultado = await actualizarPerfil(perfil); //Esta variable de perfil es la que se actualiza
        setAlerta(resultado)


    }

    const {msg}= alerta; 

    return (
    <>
        <AdminNav/>

        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
        <p className="text-xl text-center mt-5 mb-10">Modifica tu {" "} <span className="text-indigo-600 font-bold">Información</span> aquí</p>

        <div className="flex justify-center">
            <div className="w-full md:w-3/5 bg-white shadow rounded-lg p-5">
                {msg && <Alerta alerta={alerta}/>}
                <form 
                    onSubmit={handleSubmit}
                >
                    <div className="my-3">
                        <p className=" mb-4 text-right text-sm">Los campos marcados con <span className="text-indigo-600 font-bold">*</span> son <span className="text-indigo-600 font-bold">obligatorios</span></p>
                        <label className="uppercase font-bold text-gray-600" htmlFor="nombre">Nombre *</label>
                        <input
                            id="nombre"
                            type="text"
                            className="border bg-gray-50 w-full p-2 my-5 rounded-lg"
                            name="nombre"
                            value={perfil.nombre || ""}
                            onChange= {e => setPerfil({
                                ...perfil, 
                                [e.target.name]: e.target.value
                            })}
                        />
                        <label className="uppercase font-bold text-gray-600 " htmlFor="web">Sitio Web</label>
                        <input
                            id="web"
                            type="text"
                            className="border bg-gray-50 w-full p-2 my-5 rounded-lg"
                            name="web"
                            value={perfil.web || ""}
                            onChange= {e => setPerfil({
                                ...perfil, 
                                [e.target.name]: e.target.value
                            })}
                        />
                        <label className="uppercase font-bold text-gray-600 " htmlFor="telefono">Teléfono *</label>
                        <input
                            id="telefono"
                            type="tel"
                            className="border bg-gray-50 w-full p-2 my-5 rounded-lg"
                            name="telefono"
                            value={perfil.telefono || ""}
                            onChange= {e => setPerfil({
                                ...perfil, 
                                [e.target.name]: e.target.value
                            })}
                        />
                        <label className="uppercase font-bold text-gray-600 " htmlFor="email">Email *</label>
                        <input
                            id="email"
                            type="email"
                            className="border bg-gray-50 w-full p-2 my-5 rounded-lg"
                            name="email"
                            value={perfil.email || ""}
                            onChange= {e => setPerfil({
                                ...perfil, 
                                [e.target.name]: e.target.value
                            })}
                        />
                    </div>
                    <input
                        type="submit"
                        value="Guardar Cambios"
                        className=" bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-800"
                    />
                </form>
            </div>
        </div>

    </>
  )
}

export default EditarPerfil