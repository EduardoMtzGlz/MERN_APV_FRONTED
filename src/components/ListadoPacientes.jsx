import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente";

const ListadoPacientes = () => {

  const {pacientes} = usePacientes(); 

  return (
    <>
      {pacientes.length ? 
      ( <>
        <p className="text-center text-lg mb-10">Listado de {" "} <span className="font-bold text-indigo-600">pacientes</span></p>

        

        {pacientes.map(paciente => (
          <Paciente
            key={paciente._id}
            paciente={paciente}
          />
        ))}

      </>)
      : (
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">Comieza agregando pacientes {" "} <span className="text-indigo-600 font-bold">y apareceran en este lugar</span></p>
        </>
      )}

      
    </>
    
    
  )
}

export default ListadoPacientes

