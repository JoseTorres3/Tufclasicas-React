export const ADD_CART = 'ADD_CART';
export const DELETE_CART = 'DELETE_CART';


export const addCart = (product) => ({
  type: ADD_CART,
  payload: product
});


export const deleteCart = (productId) => ({
  type: DELETE_CART,
  payload: productId
});
