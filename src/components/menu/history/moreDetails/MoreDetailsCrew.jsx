import React from 'react';
import { Link } from 'react-router-dom';

export const MoreDetailsCrew = ({ item, category, url, urlUpdateData }) => (
    <>
        <div className="col-md-12">
            <h3 className="subTitle">Información personal</h3>
            <div className="section">
                <div className="row">
                    <div className="col-md-3">
                        <strong>Nombres:</strong> {item.name}
                    </div>
                    <div className="col-md-3">
                        <strong>Apellidos:</strong> {item.lastName}
                    </div>
                    <div className="col-md-3">
                        <strong>Tipo de documento:</strong> {item.typeDocument}
                    </div>
                    <div className="col-md-3">
                        <strong>Número de documento:</strong> {item.numDocument}
                    </div>
                    {item.licencia && (
                        <div className="col-md-3">
                            <strong>Número de licencia:</strong> {item.licencia}
                        </div>
                    )}
                    <div className="col-md-3">
                        <strong>Fecha de nacimiento:</strong> {item.dateOfBirth}
                    </div>
                    {item.nationality && (
                        <div className="col-md-3">
                            <strong>Nacionalidad:</strong> {item.nationality}
                        </div>
                    )}
                    <div className="col-md-3">
                        <strong>Estado civil:</strong> {item.maritalStatus}
                    </div>
                </div>
            </div>
        </div>

        <div className="col-md-12">
            <h3 className="subTitle">Información de contacto</h3>
            <div className="section">
                <div className="row">
                    <div className="col-md-3">
                        <strong>Correo electrónico:</strong> {item.email}
                    </div>
                    <div className="col-md-3">
                        <strong>Teléfono:</strong> {item.phone}
                    </div>
                    <div className="col-md-3">
                        <strong>Dirección de residencia:</strong> {item.address}
                    </div>
                    <div className="col-md-3">
                        <strong>Género:</strong> {item.sex}
                    </div>
                </div>
            </div>
        </div>

        {/* Información de Empresa */}
        <div className="col-md-12">
            <h3 className="subTitle">Información de Empresa</h3>
            <div className="section">
                <div className="row">
                    {item.status && (
                        <div className="col-md-3">
                            <strong>Estado de cuenta:</strong>{' '}
                            <b className={item.status === "activo" ? "text-success" : "text-danger"}>
                                {item.status}
                            </b>
                        </div>
                    )}
                    {item.companyName && (
                        <div className="col-md-3">
                            <strong>Empresa asociada:</strong> {item.companyName}
                        </div>
                    )}
                    {category === "crew" && item.employeeType?.typeName && (
                        <div className="col-md-3">
                            <strong>Tipo de marinero:</strong> {item.employeeType.typeName}
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Botones de acción */}
        <div className="buttons">
            <Link to={"../show-crew"}>
                <button className="more-details-btn more-details-btn-back">Volver</button>
            </Link>
            <Link
                to={category === "crew" ? `${url}/${item.id}/update` : urlUpdateData}
                state={{ from: "listado" }}
            >
                <button className="more-details-btn more-details-btn-edit">
                    <span>Editar información</span>
                    <i className="fa-solid fa-pen-to-square icon-option"></i>
                </button>
            </Link>
        </div>
    </>
);
