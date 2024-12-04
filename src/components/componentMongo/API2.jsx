import React, { useState, useEffect } from "react";
import * as Scroll from 'react-scroll'
const { Element } = Scroll;
import '../styles/Api2.css'


const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch("http://localhost:3000/users/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al consumir la API");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Element name="products">
      <h1 className="tituu">API Yoimer</h1>
      <table className="table2">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Element>
  );
};



export default Products;



