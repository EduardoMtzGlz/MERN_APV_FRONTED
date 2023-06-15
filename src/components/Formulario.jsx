import { useState, useEffect } from "react"
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";


const Formulario = () => {
  
  const [nombre, setNombre] = useState(""); 
  const [propietario, setPropietario] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState(""); 
  const [id, setId] = useState(null); //Ayuda a identificar cuando se esta editando 

  
  const [alerta, setAlerta] =useState({}); 

  const {guardarPaciente, paciente} = usePacientes(); 
  
  useEffect(() => {

    if(paciente?.nombre){
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(new Date(paciente.fecha).toLocaleDateString('en-CA')); 
        setSintomas(paciente.sintomas)
        setId(paciente._id)
    }
  }, [paciente]) //Creo que detecta el click por que se le esta pasando paciente como argumento, además observar por los cambios en esa dependencia

  const handleSubmit = async e => {
    e.preventDefault()

    //Validar el formulario 
    if([nombre, email,propietario,fecha,sintomas, id].includes('')){
      setAlerta({msg: "Hay campos vacios, favor de llenar toda la información", error:true}) 
      return; 
    }  

    
    guardarPaciente({nombre, email,propietario,fecha,sintomas, id}) //Crea un objeto con estos datos
    setAlerta({
        msg: "Guardado Correctamente"
    }); //Elimina la alerta

    setNombre("")
    setEmail("")
    setPropietario("")
    setFecha("")
    setSintomas("")
    setId("")
  }

  const {msg} = alerta;

  return (
    <>
    <p className="text-center text-lg mb-10">Añade tus pacientes y {" "} <span className="font-bold text-indigo-600">Administralos</span></p>

    <form className=" bg-white py-10 px-5 mb-10 lg:mb-5 rounded-md shadow-md" onSubmit={handleSubmit}>

    
        
        <div className="mb-5">
            <label 
                htmlFor="nombre"
                className="text-gray-700 uppercase font-bold"
            >Nombre Mascota</label>
            <input
                id="nombre"
                type="text"
                placeholder="Nombre de la Mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label 
                htmlFor="propietario"
                className="text-gray-700 uppercase font-bold"
            >Nombre del Propietario</label>
            <input
                id="propietario"
                type="text"
                placeholder="Nombre del propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={propietario}
                onChange={e => setPropietario(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label 
                htmlFor="email"
                className="text-gray-700 uppercase font-bold"
            >Email del Propietario</label>
            <input
                id="email"
                type="email"
                placeholder="Email"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label 
                htmlFor="fecha"
                className="text-gray-700 uppercase font-bold"
            >Fecha de alta</label>
            <input
                id="fecha"
                type="date"
                placeholder="Email"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value= {fecha}
                onChange = {e => setFecha(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label 
                htmlFor="sintomas"
                className="text-gray-700 uppercase font-bold"
            >Síntomas</label>
            <textarea
                id="sintomas"                
                placeholder="Anota los síntomas"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={sintomas}
                onChange = {e => setSintomas(e.target.value)}
            />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 p-2 rounded-md hover:bg-indigo-700 text-white w-full cursor-pointer transition-colors"
          value={id ? "Guardar cambios" : "Agregar Paciente"}
        />
    </form>
    { msg && <Alerta
                alerta={alerta}
            />            }

    </>
  )
}

export default Formulario