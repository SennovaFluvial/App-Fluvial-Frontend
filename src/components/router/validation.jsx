import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Importa la función para redirigir a otras páginas
import { Outlet } from "react-router-dom"; // Importa el componente para mostrar contenido anidado
import { canAccess } from "../../config/permissionsPages";
/**
 * Componente ValidationPages
 * 
 * Este componente verifica si el usuario y la empresa están activos. Si no están activos, redirige a la página de inicio de sesión.
 * Si ambos están activos, muestra el contenido que está dentro de este componente.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.user - Información del usuario.
 * @param {string} props.user.status - Estado del usuario ('activo' o 'inactivo').
 * @param {string} props.user.companyStatus - Estado de la empresa del usuario ('activo' o 'inactivo').
 * @param {Function} props.setUser - Función para actualizar la información del usuario.
 * @returns {React.ReactNode} - Muestra el contenido dentro del componente si el usuario y la empresa están activos; de lo contrario, no muestra nada.
 */
export const ValidationPages = ({ user, setUser }) => {
    const location = useLocation();
    const nav = useNavigate(); // Hook para redireccionar
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!token || !storedUser) {
            if (!isRedirecting) {
                setIsRedirecting(true); // Marca como redireccionado
                nav('/Login');
            }
            return;
        }

        // Si no hay token o no hay información del usuario almacenada, redirige al login
        if (storedUser.status !== 'activo' || storedUser.companyStatus !== 'activo') {
            if (!isRedirecting) {
                setIsRedirecting(true); // Marca como redireccionado
                setUser(null); // Limpia el estado del usuario      
                nav('/Login');
            }
            return;
        }

        // Si el usuario almacenado no coincide con el usuario actual, actualiza el estado del usuario
        if (user?.username !== storedUser.username) {
            setUser(storedUser);
            return;
        }

        const path = location?.pathname;

        if (!canAccess(user?.rol, path)) {
            if (!isRedirecting) {
                setIsRedirecting(true); // Marca como redireccionado
                nav('/adminSection'); // Redirige si la ruta no está permitida para el rol
            }
            return;
        }


    }, [user, nav, setUser, location, isRedirecting]); // Dependencias del efecto: usuario, función de navegación y función para actualizar el usuario

    // Devuelve el contenido anidado si el usuario y la empresa están activos; de lo contrario, no devuelve nada
    return user && user.status === 'activo' && user.companyStatus === 'activo' ? <Outlet /> : null;
}