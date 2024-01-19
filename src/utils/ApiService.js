import axios from 'axios';

const ApiService = axios.create({
    baseURL: 'http://localhost:8080', // Set your API base URL
    timeout: 5000, // Set a timeout (optional)
});

// Set common headers for every request
//ApiService.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');
ApiService.defaults.headers.common['Content-Type'] = 'application/json';

ApiService.interceptors.request.use(config => {
    console.log('token in axios '+sessionStorage.getItem('token'));
    if(sessionStorage.getItem('token')){
       config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`;
    }
    config.headers['Content-Type']='application/json';
    const modifiedConfig = { ...config };
    console.log(modifiedConfig);
    if (modifiedConfig.url.startsWith('/auth/')) {
        delete modifiedConfig.headers['Authorization'];
    }
    console.log(modifiedConfig);
    return modifiedConfig;
}, error => {
    return Promise.reject(error);
});

export default ApiService;