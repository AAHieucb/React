import Axios from "axios";
const { createSlice, createAsyncThunk, createDraftSafeSelector } = require("@reduxjs/toolkit");

const client = Axios.create({
    baseURL: "https://backend-nft-app.trava.finance",
    headers: {
        "Custom-Language": "en"
    },
    withCredentials: true
});

export const fetchAll = createAsyncThunk("slice/fetchData", async (_, thunkAPI) => {
    await Promise.all([
        thunkAPI.dispatch(fetchMeta()), 
        thunkAPI.dispatch(fetchRegistry({ expMin: 1 }))
    ]);
});
export const fetchMeta = createAsyncThunk("slice/fetchMeta", async () => {
    const res = await client.request({
        url: "/v1/cores/meta",
        method: "GET"
    }).then((res) => res.data);
    // or: const res = await client.get("/v1/cores/meta").then((res) => res.data);
    return res;
});
export const fetchRegistry = createAsyncThunk("slice/fetchRegistry", async (params) => {
    const { expMin = 1 } = params;
    const res = await client
        .get("/v1/cores", { params: { page: 1, limit: 5, expmin: expMin, expmax: 100000 }})
        .then((res) => res.data);
    return res;
});

const initialState = {
    loading: false,
    text: "Ấn để fetch",
    number: 0
};

const armourySlice = createSlice({
    name: "slice",
    initialState: initialState,
    reducers: {
        updateNumber: (state) => {
            state.number++;
        },
    },
    extraReducers: {
        [fetchAll.pending](state, _) {
            state.loading = true;
        },
        [fetchAll.fulfilled](state, _) {
            state.loading = false;
        },
        [fetchAll.rejected](state, _) {
            state.loading = false;
        },

        [fetchMeta.fulfilled](state, action) {
            state.loading = false;
        },
        [fetchMeta.rejected](state, _) {
            state.loading = false;
        },
        [fetchMeta.pending](state, _) {
            state.loading = true;
        },

        [fetchRegistry.pending](state, action) {
            state.loading = true;
        },
        [fetchRegistry.fulfilled](state, action) {
            state.text = action.payload.totalDocs;
            state.loading = false;
        },
        [fetchRegistry.rejected](state, error) {
            state.text = error.error.message;
            state.loading = false;
        },
    },
});

export default armourySlice.reducer;

export const { updateNumber } = armourySlice.actions;

export const selectArmourySlice = state => state.reducerSlice;
export const selectText = createDraftSafeSelector(
    (state) => selectArmourySlice(state).text,
    (text) => {
        if (!text) return null;
        return {
            text
        };
    }
);
