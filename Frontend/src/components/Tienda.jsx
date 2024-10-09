import "../styles/productos.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import axios from "axios";

function Tienda() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URI_BACK}/api/producto`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = filterType
    ? products.filter((product) => product.tipo === filterType)
    : products;
  const searchedProducts = searchTerm
    ? filteredProducts.filter((product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = searchedProducts.slice(firstIndex, lastIndex);

  return (
    <>
      <section className="sectiontitle">
        <div className="container-title">
          <h1 className="title is-3 has-text-white has-text-right newh1">
            Tienda
          </h1>
          <div className="boton-productos has-text-right">
            <Link
              to="/carrito"
              className="button is-outlined is-primary btncomprar has-text-right"
            >
              Ver Carrito
            </Link>
          </div>
        </div>
      </section>
      <section className="section section-products">
        <div className="container">
          <div className="columns">
            <div className="column is-8">
              <div className="field"></div>
            </div>
            <div className="column">
              <div className="field container-search">
                <div className="control">
                  <input
                    type="text"
                    className="input is-info"
                    placeholder="Ingrese el nombre del producto a buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="container-products">
            {currentProducts.map((product) => (
              <div className="card-product" key={product._id}>
                <Link to={`/productos/${product._id}`}>
                  <figure className="container-img">
                    <img src={product.imagen} alt={product.nombre} />
                  </figure>
                  <div className="info-product">
                    <h3>{product.nombre}</h3>
                    <p className="price">$ {product.precio}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <Pagination
            productsPerPage={productsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalProducts={filteredProducts.length}
          />
        </div>
      </section>
    </>
  );
}

export default Tienda;
