import { baseURL } from "../services/api";

 function ReturnUrlFromIp (src) {
    if (String(src).includes('http:/')) {
        return String(src).replace('http://62.217.177.200:8080', baseURL)
    }
    else if (String(src).includes('https:/')) {
        return String(src).replace('https://62.217.177.200:8080', baseURL)        
    }
    else return src
}
export default ReturnUrlFromIp;