import { SET_CITY,SET_LAT,SET_LONG,SET_TEMP } from "./Constants";

const initialState={
    city:'',
    longitude:null,
    latitude:null,
    temperature:null,
}

export default function myReducer(state=initialState,action){
    switch(action.type){
        case SET_CITY:
            return {
                ...state,
                city: action.payload
            };
        case SET_LAT:
            return {
                ...state,
                latitude: action.payload
            };
        case SET_LONG:
            return {
                ...state,
                longitude: action.payload
            };
        case SET_TEMP:
            return{
                ...state,
                temperature: action.payload
            }
        default:
            return state;
    }
}
    