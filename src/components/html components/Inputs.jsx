import React from 'react'

export const Inputs = ({ type, text, name, value, event, icon = null }) => {
    return (
        <>
            <div className="form-group">
                <label htmlFor={name}>{text}</label>
                <div className="input-group">
                    {icon && (
                        <span className="input-group-text" id="basic-addon1">
                            <i className={icon}></i>
                        </span>
                    )}
                    <input
                        type={type}
                        name={name}
                        id={name}
                        className="form-control"
                        value={value}
                        onChange={event}
                    />
                </div>
            </div>
        </>
    )
}
