import axios from "axios";
import { useEffect, useSta } from "react";



const api = axios.create({
baseURL: 'http://127.0.0.1:9091',
//headers: 'Access-Control-Allow-Origin'
//headers : { 'X-Custom-Header' : 'foobar' } 
});

export default api;
    
    
    
    


