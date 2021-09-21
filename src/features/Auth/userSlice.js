//Mỗi features sẽ có 1 file Slice khác nhau

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from '../../api/userAPI';
import StorageKeys from "../../constants/storage-keys";

// sử dụng createAsyncThunk để tạo action async
// bản chất là sử dụng middleware redux thunk để tạo action
export const register = createAsyncThunk(
    'user/register',
    async (payload) => {
        //call api to register
        const data = await userApi.register(payload);
        //save data to local storage
        localStorage.setItem(StorageKeys.TOKEN, data.jwt);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
        // return user data
        return data.user;
    }
)

export const login = createAsyncThunk(
    'user/login',
    async (payload) => {
        //call api to register
        const data = await userApi.login(payload);
        //save data to local storage
        localStorage.setItem('access_token', data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user));
        // return user data
        return data.user;
    }
)

const userSlice = createSlice(
    {
        name: 'user',
        initialState: {
            current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
            settings: {},
        },
        // Với action sync thì chúng ta định nghĩa trong reducers
        // nó sẽ tự generate ra action type
        reducers: {
            logout(state) {
                //clear local storage
                localStorage.removeItem(StorageKeys.USER);
                localStorage.removeItem(StorageKeys.TOKEN);
                state.current = {};
            }
        },
        // Với action async thì chúng ta phải định nghĩa trong extraReducers.
        //khi action thành công thì mình phải cập nhật dữ liệu vào state
        extraReducers: {
            [register.fulfilled]: (state, action) => { // state là state hiện tại, action là thông tin của action
                //action.payload sẽ bằng return trên createAsyncThunk
                state.current = action.payload;
            },
            [login.fulfilled]: (state, action) => { // state là state hiện tại, action là thông tin của action
                //action.payload sẽ bằng return trên createAsyncThunk
                state.current = action.payload;
            }
        }
    }
);

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer; //default export