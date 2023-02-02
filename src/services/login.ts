
import { useState, useEffect } from "react";
import axios from 'axios';
import {User} from "../model/User";

export const loginFunc = (user: User) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    axios.defaults.baseURL = 'https://basic-book-crud-e3u54evafq-et.a.run.app/api';
    useEffect(() => {
        axios.post('/login', JSON.stringify({email: user.email, password: user.password}))
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

    return {response, error, loading}
}