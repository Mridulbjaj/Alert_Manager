function UseDebounce(cb,delay=500){
    let timerid;
    return(...args)=>{
        console.log("debounce",...args);
        clearTimeout(timerid);
        timerid=setTimeout(()=>{
            cb(...args);
        },delay);
    }
}

export default UseDebounce;