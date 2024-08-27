import { createSlice, createAsyncThunk, createDraftSafeSelector } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fetchData = createAsyncThunk(
    'testThunk/fetchData',
    async(data, thunkParams) => {
        // 1 là data truyền vào
        // 2 là object gồm: dispatch của store, getState lấy state hiện tại, extra là tham số truyền vào lúc thiết lập redux-thunk middleware, requestId là giá trị lạ sinh ra, signal cho biết liệu 1 phần khác trong logic có đánh dấu yêu cầu này cần hủy hay k, rejectWithValue là 1 hàm tiện ích cho phép ta ép luồng trả về rejected với 1 payload

        console.log(data.name);
        console.log(thunkParams);

        const url = "https://jsonplaceholder.typicode.com/posts";
        const response = await fetch(url)
        const responseBody = await response.json();
        
        if(responseBody[0].title){
            return {text: responseBody[0].title};
        }else{
            throw Error("Data undefined rồi");
        }
        // Ở đây nếu title k tồn tại nó k báo lỗi mà chỉ trả ra undefined
    }
)

const initialState = {
    text: "Default Toolkit Slice Thunk Text",
    loading: false,
    error: null
}

const thunkSlice = createSlice({
    name: "thunk",
    initialState: initialState,
    // Bắt createAsyncThunk phải nhét vào extraReducer.
    extraReducers: {
        [fetchData.pending]: (state, action) => {
            state.loading = true
        },
        // Tương tự dùng "testThunk/fetchData/pending" ở đây
        [fetchData.fulfilled]: (state, action) => {
            state.loading = false
            state.text = action.payload.text
        },
        [fetchData.rejected]: (state, action) => {
            console.error(action)
            state.loading = false
            state.error = "Error"
        }
    }
})

export default thunkSlice.reducer;

export const selectThunkSlice = state => state.thunkSlice;

export const selectText = createDraftSafeSelector(
    selectThunkSlice,
    selectedSlice => {
        return selectedSlice.text;
    }
)

// Dùng createSelector của thư viện reselect
let exampleState = {
    getUsersOptions: 'all',
    users: [
        { name: 'a', age: 12 },
        { name: 'b', value: 19 },
    ]
}
const selectUsers = state => state.users;
const selectGetUsersOptions = state => state.getUsersOptions;
const getStateSelector = createSelector(
    [selectUsers, selectGetUsersOptions],
    (users, getUsersOptions) => ({ users, getUsersOptions })
)
console.log (getStateSelector(exampleState));
