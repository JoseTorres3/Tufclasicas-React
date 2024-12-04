import { ADD_CART, DELETE_CART } from './actions';

const initialState = {
    cantity: 0,
    items: []
};

export function cartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CART:
            const existingProductIndex = state.items.findIndex(item => item.productId === action.payload.productId);

            if (existingProductIndex !== -1) {
                const updatedItems = state.items.map((item, index) =>
                    index === existingProductIndex
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
                return {
                    ...state,
                    items: updatedItems
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, { ...action.payload }]
                };
            }

        case DELETE_CART:
            return {
                ...state,
                items: state.items.filter(item => item.productId !== action.payload)
            };

        default:
            return state;
    }
}
