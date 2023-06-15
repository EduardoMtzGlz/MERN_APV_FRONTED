import{BrowserRouter, Routes, Route} from "react-router-dom"; 
import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";

import Login  from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from "./paginas/NuevoPassword";

import AdministrarPacientes from "./paginas/AdministrarPacientes";
import EditarPerfil from "./paginas/EditarPerfil";
import CambiarPassword from "./paginas/CambiarPassword";

import { AuthProvider } from "./context/AuthProvider"; //Contiene los datos de autenticación 
import { PacientesProvider } from "./context/PacientesProvider";

//Path es la ruta principal, en este caso lleva un layout principal, pero la página que se muestra al inicio toma una parte del layout principal, pero lleva características propias que se establecen en index /login 


function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes> 
            <Route path="/" element={<AuthLayout/>}>
                <Route index element={<Login />} />
                <Route path="registrar" element={<Registrar />} />
                <Route path="confirmar-cuenta/:id" element={<ConfirmarCuenta />} />
                <Route path="olvide-password" element={<OlvidePassword />} />
                <Route path="olvide-password/:token" element={<NuevoPassword />} />
            </Route>

            <Route path="/admin" element= {<RutaProtegida/>}>
                <Route index element={<AdministrarPacientes />} />
                <Route path="perfil" element={<EditarPerfil/>}/>
                <Route path="cambiar-password" element={<CambiarPassword/>}/>
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>  
  )

}

export default App
