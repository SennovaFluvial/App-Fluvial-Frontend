import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa la función para redirigir a otras páginas
import { Outlet } from "react-router-dom"; // Importa el componente para mostrar contenido anidado
/**
 * Componente ValidationPages
 * 
 * Este componente revisa si el usuario está activo. Si no lo está, redirige a la página de inicio de sesión.
 * Si el usuario está activo, muestra los componentes hijos o el contenido anidado.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.user - Información del usuario.
 * @param {React.ReactNode} props.children - Contenido que se mostrará si el usuario está activo.
 * @returns {React.ReactNode} - Muestra el contenido basado en el estado del usuario.
 */
export const ValidationPages = ({ user, children }) => {

    const nav = useNavigate(); // Prepara la función para redirigir

    useEffect(() => {

        // Si el usuario no está activo, redirige a la página de inicio de sesión
        if (!user || user.state !== 'activo') {
            nav('/Login');
        }
    }, [user, nav]); // Revisa cada vez que cambian el usuario o la función de redirección

    // Muestra los componentes hijos si el usuario está activo, o el contenido anidado si no hay hijos
    return user && user.state === 'activo' ? (children ? children : <Outlet />) : null;

}