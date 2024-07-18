import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Se importa el hook de useNavigate para realziar las redirecciones rapidas
import { Outlet } from "react-router-dom";
export const ValidationPages = ({ user, children }) => {

    const nav = useNavigate(); // Se instancia el hook

    useEffect(() => {

        // Verifica si el usuario está definido y si el estado es 'Activo'
        if (!user || user.state !== 'activo') {
            nav('/Login');
        }
    }, [user, nav]);

    return user && user.state === 'activo' ? (children ? children : <Outlet />) : null;

}