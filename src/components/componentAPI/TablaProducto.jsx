import React, { useState, useEffect } from "react";
import { Pagination } from 'react-bootstrap';
import axios from 'axios';

const ProductTable = ({ onEdit, onDelete }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

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

      setProducts(paginatedProducts);
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

  return (
    <>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => onEdit(product)}
                >
                  Editar
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(product.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center mt-4">
        <Pagination>{renderPaginationItems()}</Pagination>
      </div>
    </>
  );
};

export default ProductTable;