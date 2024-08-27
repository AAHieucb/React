import { Typography } from "@material-ui/core";
import React from "react";
import HookForm from "./components/HookForm";
import HookText from "./components/HookText";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers/index";
import HookAsyncButton from "./components/HookAsyncButton";
import HookAsyncText from "./components/HookAsyncText";
import HookThunkButton from "./components/HookThunkButton";
import HookThunkText from "./components/HookThunkText";

import thunk from 'redux-thunk';
import { createLogger } from "redux-logger";

const middleware = [thunk];
if(process.env.NODE_ENV !== "production"){
    middleware.push(createLogger());
}
const store = createStore(reducer, applyMiddleware(...middleware));

const ReduxWithHook = () => {
    return(
        <Provider store={store}>
            <Typography style={{fontWeight: "bolder"}}>Redux With Hook</Typography>
            <HookForm></HookForm>
            <HookText></HookText>
            <br></br>
            <HookAsyncButton/>
            <HookAsyncText/>
            <br></br>
            <HookThunkButton/>
            <HookThunkText/>
            <br/>
        </Provider>
    )
}

export default ReduxWithHook;