import React, { useState } from 'react';  // Importa React y el hook useState para gestionar el estado en el componente.
import '../../assets/css/input.css'  // Importa el archivo de estilos CSS para el componente.

/**
 * Componente Inputs - genera un input de tipo texto, contraseña, u otro según el tipo pasado.
 * @param {string} type - El tipo de input (texto, contraseña, email, etc.).
 * @param {string} text - El texto de la etiqueta asociada al input.
 * @param {string} name - El nombre del input (atributo name en el HTML).
 * @param {function} event - El evento que se ejecuta cuando se cambia el valor del input.
 * @param {string} placeholder - Texto de ejemplo dentro del input.
 * @param {string} icon - Clase del icono que se muestra dentro del input.
 * @param {string} value - Valor actual del input.
 */
export const Inputs = ({ type, text, name, event, placeholder, icon, value }) => {
    // Define el estado 'showPassword' que determina si se debe mostrar o no la contraseña
    const [showPassword, setShowPassword] = useState(false);

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Cambia el estado de showPassword entre true y false
    };

    return (
        <div className="form-group"> {/* Contenedor principal del input */}+
            <label htmlFor={name}>{text}</label> {/* Etiqueta asociada al input */}
            <div className="input-group">
                {/* Si hay un icono, lo muestra en el lado izquierdo del input */}
                {icon && (
                    <span className="input-group-text" id="basic-addon1">
                        <i className={icon}></i> {/* Muestra el icono pasado como parámetro */}
                    </span>
                )}+
                {/* Input del formulario */}
                <input
                    type={type === 'password' && showPassword ? 'text' : type} // Muestra la contraseña como texto si showPassword es true, de lo contrario mantiene el tipo original
                    className="form-control" // Clase CSS del input
                    name={name} // Nombre del input
                    placeholder={placeholder} // Texto de ejemplo dentro del input
                    onChange={event} // Evento que se dispara al cambiar el valor del input
                    value={value} // Valor actual del input
                />
                {/* Si el input es de tipo 'password', muestra el icono para alternar visibilidad */}
                {type === 'password' && (
                    <div className="password-icon">
                        {/* Icono para alternar la visibilidad de la contraseña */}
                        <span onClick={togglePasswordVisibility}>
                            <i className={showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}></i>  {/* Cambia el icono según el estado de showPassword */}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
