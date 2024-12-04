const API_URL = "https://api.escuelajs.co/api/v1/products";

export const getProducts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener los productos");
  return await response.json();
};

export const createProduct = async (product) => {
    // Acá se agrega algo por defecto, La API de platzi requiere algunos o no sabemos, así lo arreglamos
    const pordefecto = {
      title: product.title, // Lo tomamos del formulario
      price: product.price, // Lo tomamos del formulario
      description: "Producto sin descripción", // Para cada que agreguemos sale esto por defecto
      categoryId: 1, // Lo pusimos para que no afecte, igual se cambia
      images: ["https://i.imgur.com/QkIa5tT.jpeg"], // Imagen que pusimos por defecto
    };
  
    console.log("Datos enviados a la API:", pordefecto);
  
    const response = await fetch("https://api.escuelajs.co/api/v1/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pordefecto),
    });
  
    if (!response.ok) {
      const detaerror = await response.json();
      console.error("Error al crear el producto:", detaerror);
      throw new Error(`Error al crear el producto: ${detaerror.message}`);
    }
  
    const data = await response.json();
    console.log("Respuesta de la API:", data);
    return data;
  };
  

export const updateProduct = async (id, product) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Error al actualizar el producto");
  return await response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar el producto");
  return response.json();
};
