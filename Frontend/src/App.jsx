import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "/src/components/Navbar";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Tienda from "./components/Tienda";
import OneProducto from "./components/OneProduct";
import Nosotros from "./components/Nosotros";
import Login from "./components/Login";
import Cuenta from "./components/Cuenta";
import UserRegister from "./components/UserRegister";
import Inicio from "./components/Inicio";
import Confirmar from "./components/Confirmar";
import Administrar from "./components/Administrar";
import ProductForm from "./components/ProductForm";
import ProductEditForm from "./components/ProductEditForm";
import UserRegisterCrud from "./components/UserRegisterCrud";
import UserEdit from "./components/UserEdit";
import ContactoRegister from "./components/ContactoRegister";
import ContactoEdit from "./components/ContactoEdit";
import SalesEdit from "./components/SalesEdit";
import PerfilEdit from "./components/PerfilEdit";
import OneCompra from "./components/OneCompra";
import OneSale from "./components/OneSale";
import Cart from './components/Cart';
import CompraRealizada from './components/CompraRealizada';

function App() {
  const [isId, setId] = useState(localStorage.getItem("userId") || "");
  const [isName, setName] = useState(localStorage.getItem("userName") || "");
  const [isLogin, setLogin] = useState(localStorage.getItem("isLoggedIn") || "");
  const [isType, setType] = useState(localStorage.getItem("userType") || "");

  useEffect(() => {
    localStorage.setItem("userId", isId);
    localStorage.setItem("userName", isName);
    localStorage.setItem("isLoggedIn", isLogin);
    localStorage.setItem("userType", isType);
  }, [isId, isName, isLogin, isType]);

  const isAdmin = () => isType === "Administrador";
  const isClient = () => isType === "Cliente";

  return (
    <>
      <BrowserRouter>
        <Navbar logged={isLogin} userName={isName} userType={isType}/>

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/productos/:id" element={<OneProducto />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/carrito" element={<Cart />} />
          {/* Actualizamos esta ruta para no usar compraId */}
          <Route path="/compra-realizada" element={<CompraRealizada />} />
          
          <Route
            path="/login"
            element={<Login setId={setId} setName={setName} setLogin={setLogin} setType={setType} />}
          />
          <Route path="/registeruser" element={<UserRegister />} />
          <Route path="/confirmar/:token" element={<Confirmar />} />
          <Route
            path="/cuenta"
            element={isLogin === "true" ? 
            <Cuenta setId={setId} setName={setName} setLogin={setLogin} setType={setType}/> : <Navigate to="/" />}
          />
          <Route
            path="/cuenta/:id"
            element={isLogin === "true" ? 
            <Cuenta setId={setId} setName={setName} setLogin={setLogin} setType={setType}/> : <Navigate to="/" />}
          />
           <Route
            path="/cuenta/compras/:id"
            element={isLogin === "true" ? 
            <OneCompra setId={setId} setName={setName} setLogin={setLogin} setType={setType}/> : <Navigate to="/" />}
          />
          <Route
            path="/cuenta/perfil/edit/:id"
            element={isLogin === "true" ? 
            <PerfilEdit setId={setId} setName={setName} setLogin={setLogin} setType={setType}/> : <Navigate to="/" />}
          />
          <Route
            path="/administracion"
            element={isAdmin() ? <Administrar /> : <Navigate to="/" />}
          />
          <Route
            path="/administracion/:id"
            element={isAdmin() ? <Administrar/> : <Navigate to="/" />}
          />
          <Route
            path="/administracion/productos/register"
            element={isAdmin() ? <ProductForm /> : <Navigate to="/" />}
          />
          <Route
            path="/administracion/productos/edit/:id"
            element={isAdmin() ? <ProductEditForm /> : <Navigate to="/" />}
          />
          <Route
            path="/administracion/usuarios/register"
            element={isAdmin() ? <UserRegisterCrud /> : <Navigate to="/" />}
          />
          <Route
            path="/administracion/usuarios/edit/:id"
            element={isAdmin() ? <UserEdit /> : <Navigate to="/" />}
          />
          <Route
            path="/administracion/contactos/register"
            element={isAdmin() ? <ContactoRegister /> : <Navigate to="/" />}
          />
          <Route
            path="/administracion/contactos/edit/:id"
            element={isAdmin() ? <ContactoEdit /> : <Navigate to="/" />}
          />
          <Route
            path="/administracion/ventas/:id"
            element={isAdmin() ? <OneSale /> : <Navigate to="/" />}
          />
          <Route
            path="/administracion/ventas/edit/:id"
            element={isAdmin() ? <SalesEdit /> : <Navigate to="/" />}
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
