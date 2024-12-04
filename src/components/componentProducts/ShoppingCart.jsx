import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../../redux/actions';
import { Pagination } from 'react-bootstrap';
import axios from 'axios';
import * as Scroll from 'react-scroll'
const { Element } = Scroll;
import '../styles/Product.css';

export function ShoppingCart() {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos de la API");
        }
        return response.json();
      })
      .then((result) => setData(result))
      .catch((err) => setError(err.message));
    fetchProducts()
  }, [currentPage]);

  const handleIncrement = (productId) => {
    setQuantity((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const handleDecrement = (productId) => {
    setQuantity((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1),
    }));
  };

  const handleAddCart = (product) => {
    const qty = quantity[product.id] || 1;
    dispatch(addCart({ productId: product.id, name: product.title, price: product.price, quantity: qty }));
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products');
      const allProducts = response.data;

      // Calcular el total de páginas
      setTotalPages(Math.ceil(allProducts.length / ITEMS_PER_PAGE));

      // Obtener los productos para la página actual
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedProducts = allProducts.slice(startIndex, endIndex);

      setData(paginatedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const renderPaginationItems = () => {
    let items = [];

    // Agregar "Primera página"
    items.push(
      <Pagination.First
        key="first"
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
      />
    );

    // Agregar "Anterior"
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      />
    );

    // Calcular el rango de páginas a mostrar
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    // Agregar primera página si está lejos
    if (startPage > 1) {
      items.push(<Pagination.Item key={1} onClick={() => setCurrentPage(1)}>{1}</Pagination.Item>);
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="ellipsis1" />);
      }
    }

    // Agregar páginas numeradas
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    // Agregar última página si está lejos
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="ellipsis2" />);
      }
      items.push(
        <Pagination.Item
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    // Agregar "Siguiente"
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      />
    );

    // Agregar "Última página"
    items.push(
      <Pagination.Last
        key="last"
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
      />
    );

    return items;
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Element name="productos">
        <h1 className='prdt'>PRODUCTOS</h1>
        <div className="product-list">
          {data.map(product => (
            <div
              key={product.id}
              className="product-card"
              style={{ backgroundImage: `url(${product.images[0]})` }}
            >
              <div className="product-info">
                <h3>{product.title}</h3>
                <p>Precio: ${product.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(product.id)}>-</button>
                  <span>{quantity[product.id] || 1}</span>
                  <button onClick={() => handleIncrement(product.id)}>+</button>
                </div>
                <button onClick={() => handleAddCart(product)}>Añadir al carrito</button>
              </div>
            </div>

          ))}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <Pagination>{renderPaginationItems()}</Pagination>
        </div>
      </Element >
    </>
  );
}
