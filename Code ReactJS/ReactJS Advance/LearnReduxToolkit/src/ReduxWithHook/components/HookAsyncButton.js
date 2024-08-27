import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { getData } from "../../Normal redux/api/callAPI";
import useAsync from "../utils/useAsync";
import { setFetchData } from "../actions/index.js";

// Dùng hook useAsync tự tạo
const HookAsyncButton = () => {
    const dispatch = useDispatch();
    const remoteCalling = useAsync(
        ({url}) => getData(url)
    );
    async function fetch(){
        dispatch(setFetchData({text: "", loading: true}))
        const {error, data, pending} = await remoteCalling.call({url: "https://jsonplaceholder.typicode.com/posts"})
        if(error){
            console.log(error);
            dispatch(setFetchData({text: error.toString(), loading: pending}));
        }else{
            console.log(data);
            dispatch(setFetchData({text: data.data[0].title, loading: false}));
        }
    }
    return(
        <div>
            <Button disabled={remoteCalling.pending} onClick={fetch}>Fetch Remote Data</Button>
        </div>
    );
};
export default HookAsyncButton;