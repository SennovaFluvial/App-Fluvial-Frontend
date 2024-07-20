import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa la función para redirigir a otras páginas
import { Outlet } from "react-router-dom"; // Importa el componente para mostrar contenido anidado

/**
 * Componente ValidationPages
 * 
 * Este componente revisa si el usuario y la empresa a la que pertenece están activos.
 * Si no están activos, redirige a la página de inicio de sesión.
 * Si ambos están activos, muestra los componentes hijos o el contenido anidado.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.user - Información del usuario.
 * @param {string} props.user.status - Estado del usuario ('activo' o 'inactivo').
 * @param {string} props.user.companyStatus - Estado de la empresa del usuario ('activo' o 'inactivo').
 * @param {React.ReactNode} props.children - Contenido que se mostrará si el usuario y la empresa están activos.
 * @returns {React.ReactNode} - Muestra el contenido basado en el estado del usuario y la empresa.
 */
export const ValidationPages = ({ user, children }) => {

    const nav = useNavigate(); // Prepara la función para redirigir

    useEffect(() => {

        // Si el usuario o la empresa no están activos, redirige a la página de inicio de sesión
        if (!user || user.status !== 'activo' || user.companyStatus !== 'activo') {
            nav('/Login');
        }
    }, [user, nav]); // Revisa cada vez que cambian el usuario o la función de redirección

    // Muestra los componentes hijos si el usuario y la empresa están activos, o el contenido anidado si no hay hijos
    return user && user.status === 'activo' && user.companyStatus === 'activo' ? (children ? children : <Outlet />) : null;

}