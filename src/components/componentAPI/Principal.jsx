import React, { useEffect, useState } from "react";
import * as Scroll from 'react-scroll'
const { Element } = Scroll;
import ProductTable from "./TablaProducto";
import ProductForm from "./Apartado";
import { getProducts, createProduct, updateProduct, deleteProduct } from "./FuncionesAPI/API";
import '../styles/Api.css'

const Principal = () => {
    const [prod, setprod] = useState([]);
    const [form, setForm] = useState({ title: "", price: "" });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const fetchprod = async () => {
            try {
                const data = await getProducts();
                setprod(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchprod();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                const updatedProduct = await updateProduct(editId, form);
                console.log("Producto actualizado:", updatedProduct);
                setprod(prod.map((p) => (p.id === editId ? updatedProduct : p)));
            } else {
                const newProduct = await createProduct(form);
                console.log("Producto creado en la API:", newProduct);
                setprod([...prod, newProduct]);
            }
            setForm({ title: "", price: "" });
            setEditId(null);
        } catch (error) {
            console.error("Error al procesar el producto:", error.message);
        }
    };

    const handleEdit = (product) => {
        setForm({ title: product.title, price: product.price });
        setEditId(product.id);
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            setprod(prod.filter((p) => p.id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Element name="panel">
            <div className="container mt-4">
                <h1>API Productos TufClasicas</h1>
                <ProductForm form={form} setForm={setForm} onSubmit={handleSubmit} />
                <ProductTable prod={prod} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </Element>
    );
};

export default Principal;
