import React from 'react'; // Importa React para poder usar JSX y crear el componente.
// import Flag from 'react-world-flags';

/**
 * Componente Select - genera un menú desplegable (select) con opciones.
 * @param {string} text - Texto de la etiqueta asociada al select.
 * @param {Array} options - Array de opciones para el select. Cada opción debe tener un `label` y un `value`.
 * @param {string} name - El nombre del select (atributo name en el HTML).
 * @param {string} value - Valor actual del select.
 * @param {function} event - Función que se ejecuta cuando el valor del select cambia.
 * @param {string} icon - Clase del icono que se muestra dentro del select (opcional).
 */
export const Select = ({ text, options = [], name, value, event, icon }) => {
    return (
        <div className="form-group"> {/* Contenedor principal del select */}
            <label htmlFor={name}>{text}<span className="text-danger">*</span> </label> {/* Etiqueta asociada al select */}
            <div className="input-group"> {/* Contenedor del select y el icono */}
                {/* Si hay un icono, lo muestra en el lado izquierdo del select */}
                {icon && (
                    <span className="input-group-text" id="basic-addon1">
                        <i className={icon}></i> {/* Muestra el icono que se pasa como parámetro */}
                    </span>
                )}
                {/* Select del formulario */}
                <select
                    id={name} // Asigna el id del select al nombre pasado como parámetro
                    name={name} // Nombre del select
                    className="form-select" // Clase CSS del select
                    value={value || ''} // Establece el valor actual del select, o un string vacío si no hay valor
                    onChange={event} // Llama a la función event cuando cambia el valor del select
                >
                    {/* Opción predeterminada que aparece cuando no se ha seleccionado ninguna opción */}
                    <option value="">Seleccione...</option>
                    {/* Itera sobre las opciones que se pasan como props para generar los elementos del select */}
                    {Array.isArray(options) && options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label} {/* Muestra la etiqueta asociada a cada opción */}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};