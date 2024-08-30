import React from 'react';
// import Flag from 'react-world-flags';

export const Select = ({ text, options = [], name, value, event, icon }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{text}</label>
            <div className="input-group">
                {icon && (
                    <span className="input-group-text" id="basic-addon1">
                        <i className={icon}></i>
                    </span>
                )}
                <select
                    id={name}
                    name={name}
                    className="form-select"
                    value={value || ''} // Asegúrate de que value sea un valor único (no un array)
                    onChange={event}
                >
                    <option value="">Seleccione...</option>
                    {Array.isArray(options) && options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};