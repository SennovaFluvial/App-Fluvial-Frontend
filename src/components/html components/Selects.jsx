import React from 'react'


export const Select = ({ text, options = [], name, value, event }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{text}</label>
            <select
                id={name}
                name={name}
                className="form-select"
                value={value}
                onChange={event}>
                <option value="">Seleccione.. </option>

                {Array.isArray(options) && options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div >
    )
}

