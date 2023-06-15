import usePacientes from "../hooks/usePacientes";

//Lista de pacientes

const Paciente = ({paciente}) => {
    
    const {setEdicion, eliminarPaciente}= usePacientes(); 

    const {email, fecha, nombre, propietario, sintomas, _id}= paciente; 


    const formatearFecha = fecha => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat("es-MX", {dateStyle: "long"}).format(nuevaFecha);
    }
   

    return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold uppercase text-indigo-700 my-2">Nombre: 
            <span className="font-normal normal-case text-black">{" "}{nombre}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-2">Propietario: 
            <span className="font-normal normal-case text-black">{" "}{propietario}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-2">Email: 
            <span className="font-normal normal-case text-black">{" "}{email}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-2">Síntomas: 
            <span className="font-normal normal-case text-black">{" "}{sintomas}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-2">Fecha de alta: 
            <span className="font-normal normal-case text-black">{" "}{formatearFecha(fecha)}</span>
        </p>

        <div className="flex justify-between my-5">
            <button
                type="button"
                className="py-1 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg uppercase"
                onClick={() => setEdicion(paciente)} // Se hace como callback para que no mande a llamar inmediantamente a la función, sino hasta que se le de click
            >
                Editar
            </button>

            <button
                className="py-1 px-10 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg uppercase"
                type="button"
                onClick={() => eliminarPaciente(nombre, _id)}
            >
                Eliminar
            </button>
        </div>
    </div>

    );
}

export default Paciente