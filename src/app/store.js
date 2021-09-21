import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/Counter/counterSlice";
import userReducer from "../features/Auth/userSlice";
import cartReducer from "../features/Cart/cartSlice";

const rootReducer = {
    counter: counterReducer,
    user: userReducer,
    cart: cartReducer,
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;
// Xây dựng slice bao gồm
//  -> Xác định những state nào để lưu trữ dữ liệu.
//  -> Xác định những action sẽ tác động lên các state đó.
