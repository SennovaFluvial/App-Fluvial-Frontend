import React from 'react'

export const AgregarCliente = () => {
  return (
    <>
          <div className="d-flex justify-content-center align-items-center vh-100">
              <div className="container-ac bg-light shadow rounded p-4">
                  <h2 className="text-center mb-4">AGREGAR CLIENTE</h2>
                  <form>
                      <div className="text-center mt-5">
                          <h3 className='form-title'>
                              <b>INFORMACIÓN PERSONAL</b>
                          </h3>
                      </div>
                      <div className="row my-4"> 
                          <div className="col-md-6">
                              <div className="form-group">
                                  <label htmlFor="nombre_cliente">Nombre</label>
                                  <input type="text" name='nombre_cliente' className="form-control" id="nombre_cliente" />
                              </div>
                          </div>
                          <div className="col-md-6">
                              <div className="form-group">
                                  <label htmlFor="apellido_cliente">Apellido</label>
                                  <input type="text" name='apellido_cliente' className="form-control" id="apellido_cliente" />
                              </div>
                          </div>
                      </div>
                      <div className="row my-4">  
                          <div className="col-md-5">
                              <div className="form-group">
                                  <label htmlFor="tipo_documento">Tipo de Documento</label>
                                  <select id="tipo_documento" name='tipo_documento' className="form-control" defaultValue="">
                                      <option value="">Seleccione</option>
                                      <option value="CC">C.C</option>
                                      <option value="CE">C.E</option>
                                      <option value="TI">T.I</option>
                                  </select>
                              </div>
                          </div>
                          <div className="col-md-7">
                              <div className="form-group">
                                  <label htmlFor="numero_documento">Número de Documento</label>
                                  <input type="text" name='numero_documento' className="form-control" id="numero_documento" />
                              </div>
                          </div>
                      </div>
                      <div className="row my-4">  
                          <div className="col-md-12">
                              <div className="form-group">
                                  <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
                                  <input type="date" name='fecha_nacimiento' className="form-control" id="fecha_nacimiento" />
                              </div>
                          </div>
                      </div>
                      <div className="row my-4">  
                          <div className="col-md-12">
                              <div className="form-group">
                                  <label htmlFor="estado_marital">Estatus Marital</label>
                                  <select id="estado_marital" name='estado_marital' className="form-control" defaultValue="">
                                      <option value="">Seleccione</option>
                                      <option value="soltero">Soltero</option>
                                      <option value="casado">Casado</option>
                                      <option value="divorciado">Divorciado</option>
                                      <option value="viudo">Viudo</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                      <div className="text-center mt-5">
                          <h3 className='form-title'>
                              <b>CONTACTO</b>
                          </h3>
                      </div>
                      <div className="row my-4"> 
                          <div className="col-md-12">
                              <div className="form-group">
                                  <label htmlFor="numero_telefono">Número de Teléfono</label>
                                  <input type="text" name='numero_telefono' className="form-control" id="numero_telefono" />
                              </div>
                          </div>
                      </div>
                      <div className="row my-4">
                          <div className="col-md-12">
                              <div className="form-group">
                                  <label htmlFor="direccion">Dirección</label>
                                  <input type="text" name='direccion' className="form-control" id="direccion" />
                              </div>
                          </div>
                      </div>
                      <div className="row my-4">
                          <div className="col-md-12">
                              <div className="form-group">
                                  <label htmlFor="genero">Género</label>
                                  <select id="genero" name='genero' className="form-control" defaultValue="">
                                      <option value="">Seleccione</option>
                                      <option value="masculino">Masculino</option>
                                      <option value="femenino">Femenino</option>
                                      <option value="otro">Otro</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                      <div className="row my-4">
                          <div className="col-md-12">
                              <div className="form-group">
                                  <label htmlFor="ciudad">Ciudad</label>
                                  <input type="text" name='ciudad' className="form-control" id="ciudad" />
                              </div>
                          </div>
                      </div>
                      <div className="text-center">
                          <button type="submit" className="btn btn-success">Guardar</button>
                      </div>
                  </form>
              </div>
          </div>
    </>
  )
}
