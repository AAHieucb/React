import { createSlice ,createAction } from '@reduxjs/toolkit';

export const otherAction = createAction("testOtherAction");

const initialState = {
    text: "Default toolkit slice text"
}

// create slice cũng chỉ là 1 cách viêt gộp createAction và createReducer bằng cách gom vào 1 module
const formSlice = createSlice({
    name: 'form',
    initialState: initialState,
    reducers: {
        setData: (state, action) => { 
            state.text = action.payload.text
        },
    },
    // extraReducers: (builder) => { // bắt action khác bên ngoài thì dùng extraReducers + build.addCase
    //     builder
    //         .addCase(otherAction, (state, action) => {
    //             console.log("Handle action bên ngoài")
    //         })
    //         .addDefaultCase((state, action) => {})
    // }
    extraReducers: {
        [otherAction]: (state, action) => {
            state.text = action.payload.text;
        }
    }
})

export const { setData } = formSlice.actions
export default formSlice.reducer

// Có thể export kiểu này để useSlector cho nhanh nhưng thực ra càng khó hiểu thôi
export const selectText = state => state.formSlice.text;