export const saveToLocal=(key,value)=>{
    if(typeof window !=="undefined"){
        localStorage.setItem(key,JSON.stringify(value))
    }
}

export const loadFromLocal=(key)=>{
if(typeof window !== "undefined"){
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) :[]
}
return [];
}