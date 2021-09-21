//Mỗi features sẽ có 1 file Slice khác nhau
const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice(
    {
        name: 'cart',
        initialState: {
            showMiniCart: false,
            cartItems: [],
        },
        reducers: {
            showMiniCart(state, action) {
                state.showMiniCart = true;
            },
            hideMiniCart(state, action) {
                state.showMiniCart = false;
            },
            addToCart(state, action) {
                // newItem = { id, product, quantity }
                const newItem = action.payload;
                const index = state.cartItems.findIndex(x => x.id === newItem.id);
                if (index >= 0) {
                    //inscrease quantity
                    state.cartItems[index].quantity += newItem.quantity;
                } else {
                    state.cartItems.push(newItem);
                }
            },
            setQuantity(state, action) {
                const { id, quantity } = action.payload;
                //check product
                const index = state.cartItems.findIndex(x => x.id === id);
                if (index >= 0) {
                    state.cartItems[index].quantity = quantity;
                }
            },
            removeFromCart(state, action) {
                const idNeedToRemove = action.payload;
                //Do state của mình là dạng object nên nó được hỗ trợ immer js
                // Nên ta có thể mutestate cái state trực tiếp mà ko cần phải clone mới dữ liệu

                state.cartItems = state.cartItems.filter(x => x.id !== idNeedToRemove);
            }
        },
    }
);

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart } = actions; //named export
export default reducer; //default export