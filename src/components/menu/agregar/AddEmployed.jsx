import { Select } from '../../html components/Selects.jsx';
import { Inputs } from '../../html components/Inputs.jsx';
import { OptionsTypeDocument, genero, status, maritalStatus } from '../update/options/arrays.jsx';
import styles from '../../../assets/css/Forms.module.css'
import { ControllerCreateUpdateEmployed } from './controllers/ControllerCreateUpdateEmployed.jsx';
import { VerifyUserChangePassword } from './controllers/VerifyUserChangePassword.jsx';
import { ModalRequestPassword } from './ModalRequestPassword.jsx';
import { useState } from 'react';
import { CancelButton } from '../../components/CancelButton.jsx';
import { useLocation } from 'react-router';

export const AddEmployed = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const queryParam = new URLSearchParams(location.search);
  const action = queryParam.get('action');
  const userData = JSON.parse(localStorage.getItem('user'));
  const userNameUser = userData?.username;
  const from = location.state?.from || 'menu';

  const { updatePassword, handleChangeVerify, errorsFormsVerify, handleSubmitVerify, formLogin } = VerifyUserChangePassword();

  const handleChangeShowModal = () => {
    setShowModal(!showModal);
  }
  const handleCloseModal = () => {
    setShowModal(false);
  }

  const { handleSubmit, handleChange, formData, errorsForms, cities, deptos, roles, role, companies, isDisabled } = ControllerCreateUpdateEmployed({ updatePassword });

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
                <Inputs text="Nombres" name="name" event={handleChange} value={formData.name} required={true} />
                {errorsForms.name && <div className="text-danger">{errorsForms.name}</div>}
              </div>
              <div className="col-md-4">
                <Inputs event={handleChange} text="Apellidos" name="lastName" value={formData.lastName} required={true} />
                {errorsForms.lastName && <div className="text-danger">{errorsForms.lastName}</div>}
              </div>
              <div className="col-md-4">
                <Select event={handleChange} value={formData.typeDocument} text="Tipo de Documento" options={OptionsTypeDocument} name="typeDocument" required={true} />
                {errorsForms.typeDocument && <div className="text-danger">{errorsForms.typeDocument}</div>}
              </div>
              <div className="col-md-3">
                <Inputs event={handleChange} text="Número de Documento" name="numDocument" icon="fa-solid fa-address-card" value={formData.numDocument} required={true} />
                {errorsForms.numDocument && <div className="text-danger">{errorsForms.numDocument}</div>}
              </div>
              <div className="col-md-3">
                <Inputs event={handleChange} type="date" text="Fecha de Nacimiento" name="birthDate" icon="fa-solid fa-calendar-days" value={formData.birthDate} required={true} />
                {errorsForms.birthDate && <div className="text-danger">{errorsForms.birthDate}</div>}
              </div>
              <div className="col-md-3">
                <Select event={handleChange} value={formData.sex} text="Género" options={genero} name="sex" required={true} />
                {errorsForms.sex && <div className="text-danger">{errorsForms.sex}</div>}
              </div>
              <div className="col-md-3">
                <Select event={handleChange} value={formData.maritalStatus} text="Estado civil" options={maritalStatus} name="maritalStatus" required={true} />
                {errorsForms.maritalStatus && <div className="text-danger">{errorsForms.maritalStatus}</div>}
              </div>
            </div>

            <div className="text-center">
              <h3><b>UBICACIÓN</b></h3>
            </div>
            <div className="row"> {/* Ciudad y Departamento */}
              <div className="col-md-4">
                <Select event={handleChange} text="Departamento" options={deptos} name="departmentName" value={formData.departmentName} required={true} />
                {errorsForms.departmentName && <div className="text-danger">{errorsForms.departmentName}</div>}
              </div>
              <div className="col-md-4">
                <Select event={handleChange} value={formData.cityName} text="Ciudad" options={cities} name="cityName" required={true} />
                {errorsForms.cityName && <div className="text-danger">{errorsForms.cityName}</div>}
              </div>
              <div className="col-md-4">
                <Inputs event={handleChange} text="Dirección de residencia" name="address" icon="fa-solid fa-map-pin" value={formData.address} required={true} />
                {errorsForms.address && <div className="text-danger">{errorsForms.address}</div>}
              </div>
            </div>

            <div className="text-center">
              <h3><b>CONTACTO</b></h3>
            </div>
            <div className="row mt-2"> {/* Teléfono y Usuario */}
              <div className="col-md-4">
                <Inputs event={handleChange} text="Número de Teléfono" name="phone" icon="fa-solid fa-phone-volume" value={formData.phone} required={true} />
                {errorsForms.phone && <div className="text-danger">{errorsForms.phone}</div>}
              </div>

              <div className="col-md-4">
                <Inputs event={handleChange} text="Usuario" name="username" icon="fa-solid fa-user" value={formData.username} required={true} />
                {errorsForms.username && <div className="text-danger">{errorsForms.username}</div>}
              </div>
              <div className="col-md-4">
                <Inputs event={handleChange} text="Confirmar Usuario" name="confirmUsername" icon="fa-regular fa-envelope" value={formData.confirmUsername} required={true} />
                {errorsForms.confirmUsername && <div className="text-danger">{errorsForms.confirmUsername}</div>}
              </div>
              {
                !action ? (<>
                  <div className="row">
                    <div className="col-md-6">
                      <Inputs event={handleChange} type="password" text="Crear Contraseña" name="password" icon="fa-solid fa-lock" value={formData.password} required={true} />
                      {errorsForms.password && <div className="text-danger">{errorsForms.password}</div>}
                    </div>
                    <div className="col-md-6">
                      <Inputs event={handleChange} type="password" text="Confirmar Contraseña" name="confirmPassword" icon="fa-solid fa-lock" value={formData.confirmPassword} required={true} />
                      {errorsForms.confirmPassword && <div className="text-danger">{errorsForms.confirmPassword}</div>}
                    </div>
                  </div>
                </>) : action && action === "update" ? (
                  <>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-check my-4">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={showModal}
                            onChange={handleChangeShowModal}
                          />
                          <label className="form-check-label">
                            ¿Cambiar contraseña?
                          </label>
                        </div>
                      </div>

                      {updatePassword && (
                        <>
                          <div className="row">
                            <div className="col-md-6">
                                <Inputs event={handleChange} type="password" text="Crear Contraseña" name="password" icon="fa-solid fa-lock" value={formData.password} required={true} />
                              {errorsForms.password && <div className="text-danger">{errorsForms.password}</div>}
                            </div>
                            <div className="col-md-6">
                                <Inputs event={handleChange} type="password" text="Confirmar Contraseña" name="confirmPassword" icon="fa-solid fa-lock" value={formData.confirmPassword} required={true} />
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
                  <Select event={handleChange} value={formData.companyName} text="Empresa" options={companies} name="companyName" required={true} />
                  {errorsForms.companyName && <div className="text-danger">{errorsForms.companyName}</div>}
                </div>
              )}
              {/* </div> */}

              <div className="col-md-4">
                <Select event={handleChange} value={formData.roleRequest.roleListName[0]} text="Rol" options={roles} name="roleListName" required={true} />
                {errorsForms.roleListName && <div className="text-danger">{errorsForms.roleListName}</div>}
              </div>
              <div className="col-md-4">
                <Select event={handleChange} value={formData.estado} text="Estado" options={status} name="estado" required={true} />
                {errorsForms.estado && <div className="text-danger">{errorsForms.estado}</div>}
              </div>
            </div>
            <div className="text-center">
              <CancelButton
                from={from}
                urlPageList={"../show-users"}
              />
              <button type="submit" className={`${styles.guardar + " ms-2"} ${isDisabled ? "is-disabled-button" : ""}`}>{action === 'update' ? 'Actualizar' : 'Crear'} Empleado <i className="fa-solid fa-building-user"></i></button>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <ModalRequestPassword
          userNameUser={userNameUser}
          showModal={showModal}
          handleClose={handleCloseModal}
          handleChangeVerify={handleChangeVerify}
          errorsFormsVerify={errorsFormsVerify}
          handleSubmitVerify={handleSubmitVerify}
          formLogin={formLogin}
        />)}
    </>
  )
}