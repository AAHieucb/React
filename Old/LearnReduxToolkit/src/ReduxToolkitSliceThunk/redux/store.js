import { configureStore } from "@reduxjs/toolkit";
import formreducer from "./form/form-slice";
import thunkSlice from "./thunkTest/thunk-slice";
import createSagaMiddleware from "redux-saga";
import sagaSlice from "./sagaTest/sagaTest-slice";
import { fetchDataSaga } from "./sagaTest/sagaTest-slice";
import { all } from "redux-saga/effects";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        formSlice: formreducer,
        thunkSlice,
        sagaSlice
    },
    // Nếu muốn bỏ 1 default middleware, vẫn dùng các default khác và dùng thêm các middleware của ta
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    // or middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);

//thg nhét như này vào file index.js saga riêng
function* rootSaga(){
    yield all([fetchDataSaga()]);
}

