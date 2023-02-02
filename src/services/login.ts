
import { useState, useEffect } from "react";
import axios from 'axios';
import { User } from "../model/User";
import axiosMid from './api';

export const loginFunc = (user: User) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    axios.defaults.baseURL = 'https://basic-book-crud-e3u54evafq-et.a.run.app/api';
    useEffect(() => {
        axios.post('/login', JSON.stringify({ email: user.email, password: user.password }))
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    }, [user]);

    return { response, error, loading }
}

export const isLogged = () => {
    const token = localStorage.getItem('token');
    if (token == "") return false;
    axios.get('https://basic-book-crud-e3u54evafq-et.a.run.app/api/user', {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(() => {
            return true
        })
        .catch(() => {
            return false
        })
}

export const useAuth = () => {
    let status = false;
    let dataReturn = {}

    if (isLogged()) {
        axiosMid.get('/user')
            .then(data => {
                dataReturn = data
                status = true
                return { status, dataReturn }
            })
    }
    return { status, dataReturn }
}