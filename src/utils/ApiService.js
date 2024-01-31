import axios from 'axios';
import { alertError } from './FormValidation';

const ApiService = axios.create({
    baseURL: 'http://localhost:8080', // Set your API base URL
    timeout: 5000, // Set a timeout (optional)
});

const isTokenExpired = (expireAt) => {
    return new Date().getTime() >= new Date(expireAt).getTime();
}

// Set common headers for every request
//ApiService.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');
ApiService.defaults.headers.common['Content-Type'] = 'application/json';

ApiService.interceptors.request.use(config => {
    console.log('token in axios ' + sessionStorage.getItem('token'));
    if (sessionStorage.getItem('token')) {
        if (!config.url.startsWith('/auth/') && isTokenExpired(sessionStorage.getItem('expireAt'))) {
            alertError('your login session is expired!!!');
            setTimeout(() => window.location.href = 'http://localhost:3000', 2000);

        }
        config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`;
    }
    config.headers['Content-Type'] = 'application/json';
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