import { SET_CITY,SET_LAT,SET_LONG,SET_TEMP } from "./Constants";

export const setCity = (city)=>{
    return{
        type:SET_CITY,
        payload:city
    }
}

export const setLat = (lat)=>{
    return{
        type:SET_LAT,
        payload:lat
    }
}

export const setLong = (long)=>{
    return{
        type:SET_LONG,
        payload:long
    }
}

export const setTemp = (temp)=>{
    return{
        type:SET_TEMP,
        payload:temp
    }
}