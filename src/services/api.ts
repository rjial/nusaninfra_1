import axios from 'axios'
import { config } from 'localforage';

axios.defaults.baseURL = 'https://basic-book-crud-e3u54evafq-et.a.run.app/api';



const token = localStorage.getItem('token');
if (token != "" || token != undefined) {
    axios.interceptors.request.use(
        config => {
            const { origin } = new URL(config.url!!);
            const allowedOrigins = [axios.defaults.baseURL];
            
    
            if (allowedOrigins.includes(origin)) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config
        },
        error => {
            return Promise.reject(error);
        }
    )
}

export default axios