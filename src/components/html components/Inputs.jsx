import React, { useState } from 'react';
import '../../assets/css/input.css'

export const Inputs = ({ type = 'text', text, name, placeholder, event, icon }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="form-group">
            <label htmlFor={name}>{text}</label>
            <div className="input-group">
                {icon && (
                <span className="input-group-text" id="basic-addon1">
                    <i className={icon}></i>
                </span>
            )}
                <input
                    type={type === 'password' && showPassword ? 'text' : type}
                    className="form-control"
                    name={name}
                    placeholder={placeholder}
                    onChange={event}
                />
                {type === 'password' && (
                    <div className="password-icon">
                        <span onClick={togglePasswordVisibility}>
                            <i className={showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}></i>
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
