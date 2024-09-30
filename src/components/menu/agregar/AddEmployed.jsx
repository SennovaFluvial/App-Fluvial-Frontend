import { Select } from '../../html components/Selects.jsx';
import { Inputs } from '../../html components/Inputs.jsx';
import { OptionsTypeDocument, genero, status, maritalStatus, codigoPaises } from '../update/options/arrays.jsx';
import styles from '../../../assets/css/Forms.module.css'
import '../../../assets/css/success.css'
import { ControllerCreateUpdateEmployed } from './controllers/ControllerCreateUpdateEmployed.jsx';
import { useState } from 'react';
import { VerifyUserChangePassword } from './controllers/VerifyUserChangePassword.jsx';

export const AddEmployed = () => {

  const queryParam = new URLSearchParams(location.search);
  const action = queryParam.get('action');
  const userData = JSON.parse(localStorage.getItem('user'));
  const userNameUser = userData?.username;
  // Define updatePassword antes de usarlo
  const {
    updatePassword,
    handleChangeVerify,
    errorsFormsVerify,
    handleSubmitVerify,
    userName,
    formLogin
  } = VerifyUserChangePassword();

  const {
    handleSubmit,
    handleChange,
    formData,
    errorsForms,
    cities,
    deptos,
    roles,
    role,
    companies,
    isDisabled
  } = ControllerCreateUpdateEmployed({ updatePassword });

  return (
    <>
      <div className={styles.card}>
        <div className={styles.container}>
          <h2 className={styles.title}>{action === 'update' ? 'ACTUALIZAR EMPLEADO' : 'CREAR EMPLEADO'}</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.h3}>
              <h3><b>INFORMACIÓN PERSONAL</b></h3>
            </div>
            <div className="row"> {/* Nombres y apellidos */}
              <div className="col-md-4">
                <Inputs text="Nombres" name="name" event={handleChange} value={formData.name} />
                {errorsForms.name && <div className="text-danger">{errorsForms.name}</div>}
              </div>
              <div className="col-md-4">
                <Inputs event={handleChange} text="Apellidos" name="lastName" value={formData.lastName} />
                {errorsForms.lastName && <div className="text-danger">{errorsForms.lastName}</div>}
              </div>
              <div className="col-md-4">
                <Select event={handleChange} value={formData.typeDocument} text="Tipo de Documento" options={OptionsTypeDocument} name="typeDocument" />
                {errorsForms.typeDocument && <div className="text-danger">{errorsForms.typeDocument}</div>}
              </div>
              <div className="col-md-3">
                <Inputs event={handleChange} text="Número de Documento" name="numDocument" icon="fa-solid fa-address-card" value={formData.numDocument} />
                {errorsForms.numDocument && <div className="text-danger">{errorsForms.numDocument}</div>}
              </div>
              <div className="col-md-3">
                <Inputs event={handleChange} type="date" text="Fecha de Nacimiento" name="birthDate" icon="fa-solid fa-calendar-days" value={formData.birthDate} />
                {errorsForms.birthDate && <div className="text-danger">{errorsForms.birthDate}</div>}
              </div>
              <div className="col-md-3">
                <Select event={handleChange} value={formData.sex} text="Género" options={genero} name="sex" />
                {errorsForms.sex && <div className="text-danger">{errorsForms.sex}</div>}
              </div>
              <div className="col-md-3">
                <Select event={handleChange} value={formData.maritalStatus} text="Estado civil" options={maritalStatus} name="maritalStatus" />
                {errorsForms.maritalStatus && <div className="text-danger">{errorsForms.maritalStatus}</div>}
              </div>
            </div>

            <div className="text-center">
              <h3><b>UBICACIÓN</b></h3>
            </div>
            <div className="row"> {/* Ciudad y Departamento */}
              <div className="col-md-4">
                <Select event={handleChange} text="Departamento" options={deptos} name="departmentName" value={formData.departmentName} />
                {errorsForms.departmentName && <div className="text-danger">{errorsForms.departmentName}</div>}
              </div>
              <div className="col-md-4">
                <Select event={handleChange} value={formData.cityName} text="Ciudad" options={cities} name="cityName" />
                {errorsForms.cityName && <div className="text-danger">{errorsForms.cityName}</div>}
              </div>
              <div className="col-md-4">
                <Inputs event={handleChange} text="Dirección" name="address" icon="fa-solid fa-map-pin" value={formData.address} />
                {errorsForms.address && <div className="text-danger">{errorsForms.address}</div>}
              </div>
            </div>

            <div className="text-center">
              <h3><b>CONTACTO</b></h3>
            </div>
            <div className="row mt-2"> {/* Teléfono y Usuario */}
              <div className="col-md-2">
                <Select event={handleChange} text="Código País" options={codigoPaises} value={formData.codigoPais} name="codigoPais" icon="fa-solid fa-earth-americas" />
                {errorsForms.codigoPais && <div className="text-danger">{errorsForms.codigoPais}</div>}
              </div>
              <div className="col-md-4">
                <Inputs event={handleChange} text="Número de Teléfono" name="phone" icon="fa-solid fa-phone-volume" value={formData.phone} />
                {errorsForms.phone && <div className="text-danger">{errorsForms.phone}</div>}
              </div>

              <div className="col-md-3">
                <Inputs event={handleChange} text="Usuario" name="username" icon="fa-solid fa-user" value={formData.username} />
                {errorsForms.username && <div className="text-danger">{errorsForms.username}</div>}
              </div>
              <div className="col-md-3">
                <Inputs event={handleChange} text="Confirmar Usuario" name="confirmUsername" icon="fa-regular fa-envelope" value={formData.confirmUsername} />
                {errorsForms.confirmUsername && <div className="text-danger">{errorsForms.confirmUsername}</div>}
              </div>
              {
                !action ? (<>
                  <div className="row">
                    <div className="col-md-6">
                      <Inputs event={handleChange} type="password" text="Crear Contraseña" name="password" icon="fa-solid fa-lock" value={formData.password} />
                      {errorsForms.password && <div className="text-danger">{errorsForms.password}</div>}
                    </div>
                    <div className="col-md-6">
                      <Inputs event={handleChange} type="password" text="Confirmar Contraseña" name="confirmPassword" icon="fa-solid fa-lock" value={formData.confirmPassword} />
                      {errorsForms.confirmPassword && <div className="text-danger">{errorsForms.confirmPassword}</div>}
                    </div>
                  </div>
                </>) : action && action === "update" ? (
                  <>
                    <div className="row">
                      <div className="col-md-4">

                        <div className="form-check my-4">
                          <input className="form-check-input" type="checkbox" data-bs-toggle="modal" data-bs-target="#updateWitdhPassword" />
                          <label className="form-check-label">
                            ¿Cambiar contraseña?
                          </label>
                        </div>
                      </div>

                      {/* Solo mostrar el formulario de cambiar contraseña si updatePassword es true */}
                      {updatePassword && (
                        <>
                          <div className="row">
                            <div className="col-md-6">
                              <Inputs event={handleChange} type="password" text="Crear Contraseña" name="password" icon="fa-solid fa-lock" value={formData.password} />
                              {errorsForms.password && <div className="text-danger">{errorsForms.password}</div>}
                            </div>
                            <div className="col-md-6">
                              <Inputs event={handleChange} type="password" text="Confirmar Contraseña" name="confirmPassword" icon="fa-solid fa-lock" value={formData.confirmPassword} />
                              {errorsForms.confirmPassword && <div className="text-danger">{errorsForms.confirmPassword}</div>}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : null
              }
            </div>

            <div className="text-center">
              <h3><b>INFORMACIÓN LABORAL</b></h3>
            </div>
            <div className="row mt-2">
              {/* <div className="row"> */}
              {role === 'SUPERADMIN' && (
                <div className="col-md-4">
                  <Select event={handleChange} value={formData.companyName} text="Empresa" options={companies} name="companyName" />
                  {errorsForms.companyName && <div className="text-danger">{errorsForms.companyName}</div>}
                </div>
              )}
              {/* </div> */}

              <div className="col-md-4">
                <Select event={handleChange} value={formData.roleRequest.roleListName[0]} text="Rol" options={roles} name="roleListName" />
                {errorsForms.roleListName && <div className="text-danger">{errorsForms.roleListName}</div>}
              </div>
              <div className="col-md-4">
                <Select event={handleChange} value={formData.estado} text="Estado" options={status} name="estado" />
                {errorsForms.estado && <div className="text-danger">{errorsForms.estado}</div>}
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className={`btn btn-success ${isDisabled ? "is-disabled-button" : ""}`}
              >
                {action === 'update' ? 'Actualizar' : 'Crear'} Empleado <i className="fa-solid fa-building-user"></i></button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}

      <div className="modal fade" id="updateWitdhPassword" aria-labelledby="updateWitdhPassword" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Verificación de Usuario</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form>
              <div className="modal-body">
                <h1 className="modal-title fs-5">{`Ingresa la contraseña del usuario ${userName}`}</h1>
                <Inputs
                  placeholder="Contraseña..."
                  event={handleChangeVerify}
                  type="password"
                  name="password"
                  icon="fa-solid fa-lock"
                  value={formLogin.password}
                />
                {errorsFormsVerify.password && (
                  <div className="text-danger">{errorsFormsVerify.password}</div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                  Cerrar
                </button>
                <button type="button" className="btn btn-success" onClick={handleSubmitVerify}>
                  Validar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}