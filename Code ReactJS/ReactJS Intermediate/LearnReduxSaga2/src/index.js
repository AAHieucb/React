import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/reducers.js"
import  { postWatcher } from "./sagas/saga.js";
import createSagaMiddleware from 'redux-saga';

// Hàm tạo 1 saga middleware và kết nối saga với store
const sagaMiddleWare = createSagaMiddleware()
var store = createStore(reducer, applyMiddleware(sagaMiddleWare));
// Hàm này gọi để run saga ngay sau khi applyMiddleware là bắt đầu hàm takeEvery chờ bắt sự kiện để thực hiện hàm
// Chú ý postWatcher kp là middleware mà sagaMiddleWare mới là middleware để dùng và chỉ cho nó run postWatcher mà thôi
sagaMiddleWare.run(postWatcher);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);