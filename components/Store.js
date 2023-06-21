import myReducer from "./Reducer";
import { configureStore } from "@reduxjs/toolkit";

const store= configureStore({
    reducer:{
        reducer: myReducer
    },
    devTools: true
})

export default store;