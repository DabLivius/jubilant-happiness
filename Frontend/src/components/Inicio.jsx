import "../styles/index.css";
import "../styles/style.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { 
  validateFullName, 
  validateEmail,
  validatePhone 
} from "../hooks/useValidations";
import axios from 'axios';

export const Inicio = () => {
  const axiosInstance = axios.create({baseURL: process.env.REACT_APP_API_URL,});

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    phone: "",
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
        email: isValid ? "" : "Correo electrónico no válido.",
      });
    }

    if (name === "phone") {
      const isValid = validatePhone(value);
      setErrors({
        ...errors,
        phone: isValid ? "" : "Número de teléfono no válido",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isNombreValid = validateFullName(formData.nombre);
    const isEmailValid = validateEmail(formData.email);

    if (isNombreValid && isEmailValid) {
      try {
        const response = await axios.post(import.meta.env.VITE_URI_BACK+'/api/contacto/', formData);
        console.log("Entro!!")
        setModalContent("Contacto registrado correctamente.");
        setShowModal(true);
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.msg || "Error desconocido";
          setModalContent(errorMessage);
          setShowModal(true);
        }
      }
    } else {
      setErrors({
        nombre: isNombreValid
          ? ""
          : "Nombre inválido. Solo se permiten letras, espacios y apóstrofes.",
        email: isEmailValid ? "" : "Correo electrónico no válido.",
      });
    }
  };


  return (
    <>
      <section className="select-inicio">
        <div className="columns productopromo">
          <div className="column is-8 columnimagen">
            <div className="image-container">
              <img src="../img/Elementos.jpg" alt="Imagen" />
            </div>
          </div>
          <div
            className="column is-4 has-background-black has-text-centered columnpromo 
        is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
          >
            <div className="container-promo is-centered">
              <h2 className="title is-1 has-text-center newh2">
                ¡Sí Hay Productos Para Fiestas, De Todos Los Tipos!
              </h2>
              <div className="boton-productos">
                <Link to="/tienda">
                  <p className="button is-outlined is-info">Ver Productos</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="nosotros-box">
          <h2 className="title is-4 has-text-centered">¿Quiénes somos?</h2>
          <p className="mb-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="button-container has-text-centered">
            <Link to="/nosotros">
              <p className="button is-danger button-login">Conocer más</p>
            </Link>
          </div>
        </div>
        {/* <div className="productos-dest has-text-centered">
          <h2 className="title is-4 has-text-centered">Productos destacados</h2>
          <div className="columns is-8 is-centered">
            {currentProducts.map((product, index) => (
              <div
                key={product._id}
                className="column is-6-tablet is-4-desktop is-3-widescreen"
              >
                <div className="producto mb-5">
                  <Link
                    className="container-img"
                    to={`/productos/${product._id}`}
                  >
                    <img src={product.image} alt={`Producto ${index + 1}`} />
                  </Link>
                  <p>{product.nombre}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="container-descuentos">
          <div className="columns is-centered">
            <div className="column is-4 is-offset-8 is-half has-background-black container-formu">
              <h2 className="title is-4 has-text-white has-text-centered">
                Recibe nuestras ofertas y descuentos
              </h2>
              <div className="formulario-container">
                <form onSubmit={handleSubmit}>
                  <div className="formulario field">
                    <label className="label has-text-white" htmlFor="nombre">
                      Nombre Completo:
                    </label>
                    <div className="control">
                      <input
                        className={`input ${errors.nombre ? "is-danger" : ""}`}
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Ingrese su nombre completo"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.nombre && (
                      <p className="help is-danger">{errors.nombre}</p>
                    )}
                  </div>
                  <div className="formulario field">
                    <label className="label has-text-white" htmlFor="email">
                      Correo Electrónico:
                    </label>
                    <div className="control">
                      <input
                        className={`input ${errors.email ? "is-danger" : ""}`}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="correo@example.com"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.email && (
                      <p className="help is-danger">{errors.email}</p>
                    )}
                  </div>
                  <div className="field">
                      <label className="label has-text-white">Teléfono</label>
                      <div className="control">
                        <input
                          className="input"
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
                  <div className="boton-enviar has-text-centered mb-3">
                    <button
                      className="button is-outlined is-info"
                      type="submit"
                    >
                      Enviar
                    </button>
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
                <Link className="delete" aria-label="close" onClick={() => setShowModal(false)}>
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

export default Inicio;
