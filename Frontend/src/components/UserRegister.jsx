  import {
      validateFullName,
      validateEmail,
      validatePhone,
      validatePassword,
      validateComentario,
    } from "../hooks/useValidations";
  import { useState } from "react";
  import { Link } from "react-router-dom";
  import axios from 'axios';
  
const UserRegister = () => {
    const [formData, setFormData] = useState({
      nombre: "",
      email: "",
      phone: "",
      direccion: "",
      password: "",
      tipoUsuario:"Cliente",
      confirmpassword: ""
    });
  
    const [errors, setErrors] = useState({
      nombre: "",
      email: "",
      phone: "",
      direccion: "",
      password: "",
      tipoUsuario:"",
      confirmpassword: ""
    });

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
  
      if (name === "nombre") {
        const isValid = validateFullName(value);
        setErrors({
          ...errors,
          nombre: isValid
            ? ""
            : "Nombre inválido. Solo se permiten letras, espacios y apóstrofes.",
        });
      }
  
      if (name === "email") {
        const isValid = validateEmail(value);
        setErrors({
          ...errors,
          email: isValid ? "" : "Correo electrónico no válido",
        });
      }
  
      if (name === "phone") {
        const isValid = validatePhone(value);
        setErrors({
          ...errors,
          phone: isValid ? "" : "Número de teléfono no válido",
        });
      }

      if (name === "direccion") {
        const isValid = validateComentario(value);
        setErrors({
          ...errors,
          direccion: isValid ? "" : "Dirección de residencia no válida",
        });
      }

      if (name === "password") {
        const isValid = validatePassword(value);
        setErrors({
          ...errors,
          password: isValid ? "" : "La Contraseña no es válida.",
        });
      }

      if (name === "confirmpassword") {
        if (value !== formData.password) {
          setErrors({
            ...errors,
            confirmpassword: "La Contraseña no es válida.",
          });
        } else {
          setErrors({
            ...errors,
            confirmpassword: "",
          });
        }
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const isNameValid = validateFullName(formData.nombre);
      const isEmailValid = validateEmail(formData.email);
      const isPhoneValid = validatePhone(formData.phone);
      const isDireccionValid = validateComentario(formData.direccion);
      const isPasswordValid = validatePassword(formData.password);
      const isConfirmPasswordValid = validatePassword(formData.confirmpassword);
    
      if (isNameValid && isEmailValid && isPhoneValid && isDireccionValid && isPasswordValid && isConfirmPasswordValid) {
        try {
          if(formData.password == formData.confirmpassword)
          {
            const response = await axios.post(import.meta.env.VITE_URI_BACK+ "/api/usuario", formData);
            setModalContent("Usuario registrado correctamente.");
            setShowModal(true);
          }
          else
          {
            setModalContent("Usuario no registrado.");
            setShowModal(true);
          }
        } catch (error) {
          if (error.response) {
            const errorMessage = error.response.data.msg || "Error desconocido";
            setModalContent(errorMessage);
            setShowModal(true);
          }
        }
      } else {
        setErrors({
          nombre: isNameValid
            ? ""
            : "Nombre inválido. Solo se permiten letras, espacios y apóstrofes.",
          email: isEmailValid ? "" : "Correo electrónico no válido.",
          phone: isPhoneValid ? "" : "Número de teléfono no válido.",
          direccion: isDireccionValid ? "" : "Dirección de residencia no válida.",
          password: isPasswordValid ? "" : "Contraseña no válida.",
          confirmpassword: isConfirmPasswordValid ? "" : "Contraseña no válida.",
        });
      }
    };
    
  
    return (
      <>
        <section class="section section-register">
          <div class="container container-background">
            <div class="columns is-centered">
              <div class="column is-6">
                <div class="box">
                  <h2 class="title is-2 has-text-centered mb-6 newh2">
                    Crear una Cuenta
                  </h2>
                  <p class="subtitle is-6 has-text-centered mb-1 newsubtitle">
                  Por favor, complete los siguientes campos para crear su cuenta y disfrutar de todos nuestros productos.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div class="field">
                      <label class="label">Nombre Completo</label>
                      <div class="control">
                        <input
                          class="input"
                          id="nombre"
                          name="nombre"
                          type="text"
                          placeholder="Ingrese su nombre completo"
                          onChange={handleChange}
                        />
                      </div>
                      {errors.nombre && (
                        <p className="help is-danger">{errors.nombre}</p>
                      )}
                    </div>
                    <div class="field">
                      <label class="label">Email</label>
                      <div class="control">
                        <input
                          class="input"
                          id="email"
                          name="email"
                          type="email"
                          placeholder="correo@example.com"
                          onChange={handleChange}
                        />
                      </div>
                      {errors.email && (
                        <p className="help is-danger">{errors.email}</p>
                      )}
                    </div>
                    <div class="field">
                      <label class="label">Teléfono</label>
                      <div class="control">
                        <input
                          class="input"
                          id="phone"
                          name="phone"
                          type="text"
                          placeholder="Ingrese su número de teléfono"
                          onChange={handleChange}
                        />
                      </div>
                      {errors.phone && (
                        <p className="help is-danger">{errors.phone}</p>
                      )}
                    </div>
                    <div class="field">
                      <label class="label">Dirección de Residencia</label>
                      <div class="control">
                        <input
                          class="input"
                          id="direccion"
                          name="direccion"
                          type="text"
                          placeholder="Ingrese su número de teléfono"
                          onChange={handleChange}
                        />
                      </div>
                      {errors.direccion && (
                        <p className="help is-danger">{errors.direccion}</p>
                      )}
                    </div>
                    <div class="field">
                    <label class="label">Contraseña</label>
                    <div class="control">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        class="input"
                        placeholder="Ingrese su contraseña"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.password && (
                      <p className="help is-danger">{errors.password}</p>
                    )}
                  </div>
                  <div class="field">
                    <label class="label">Confirmar Contraseña</label>
                    <div class="control">
                      <input
                        type="password"
                        id="confirmpassword"
                        name="confirmpassword"
                        class="input"
                        placeholder="Ingrese su contraseña"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.confirmpassword && (
                      <p className="help is-danger">{errors.confirmpassword}</p>
                    )}
                  </div>
                    <div class="field is-grouped is-grouped-centered">
                      <div class="control">
                        <button class="button is-danger button-login">
                          Crear Usuario
                        </button>
                        <Link to="/login" className="button is-link btn-form">
                          Regresar
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className={`modal ${showModal ? "is-active" : ""}`}>
            <div className="modal-background" onClick={() => setShowModal(false)}></div>
            <div className="modal-card custom-modal">
              <header className="modal-card-head">
                <p className="modal-card-title">Mensaje</p>
                <Link className="delete" aria-label="close" to="/login" onClick={() => setShowModal(false)}>
                </Link>
              </header>
              <section className="modal-card-body">
                <p>{modalContent}</p>
              </section>
            </div>
          </div>
        </section>
      </>
    );
  };
  
  export default UserRegister;
  