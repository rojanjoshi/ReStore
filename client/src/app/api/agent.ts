import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = 'http://localhost:5021/';

const responseBody = (response: AxiosResponse) => response.data;

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));


axios.interceptors.response.use(async response => {
    await sleep();
    return response;
}, (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
        case 400:
       
        console.log("400 error");
            
            break;
   
        default:
            break;
    }
    return Promise.reject(error.response);
})


const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}

const agent = {
    Catalog
    
}

export default agent;