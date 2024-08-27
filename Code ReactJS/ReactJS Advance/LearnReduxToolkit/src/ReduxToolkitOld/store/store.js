import { configureStore } from "@reduxjs/toolkit";
import { setter } from "../reducers/formreducer";
import { thunk as thunkre } from "../reducers/thunkreducer";
import thunk from 'redux-thunk';
import logger from "redux-logger";

export const store = configureStore({
    reducer: {
        setter,
        thunkre: thunkre
    },
    middleware: [thunk, logger],
    devTools: process.env.NODE_ENV !== 'production',
})