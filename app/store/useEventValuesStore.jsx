import React from "react";
import { create } from "zustand";

const useEventValuesStore= create((set)=>({
    storedName:"",
    storedDate:"",
    storedAvatar:null,

    setStoredValues:(newValue)=>set({
        storedName:newValue.name,
        storedDate:newValue.date,
        storedAvatar:newValue.avatar
    })
}))



export default useEventValuesStore;
