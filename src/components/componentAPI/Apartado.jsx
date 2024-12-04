import React from "react";

const ProductForm = ({ form, setForm, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="product-form">
      <div className="form-group">
        <label>Nombre del Producto</label>
        <input
          type="text"
          className="form-input"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label>Precio</label>
        <input
          type="number"
          className="form-input"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
          required
        />
      </div>
      <button type="submit" className="submit-btn">
        {form.id ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
};

export default ProductForm;
