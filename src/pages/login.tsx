import { useEffect, useState } from 'react'
import LoginForm from '../components/login/LoginForm'
import { User } from '../model/User'
import { loginFunc } from '../services/login'
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Navbar from '../components/common/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const MySwal = withReactContent(Swal)
    const Toast = MySwal.mixin({
        toast: true,
    })
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token') != null) return navigate('/')
    }, [])
    const loginProcess = (user: User) => {
        axios.post('https://basic-book-crud-e3u54evafq-et.a.run.app/api/login', { email: user.email, password: user.password })
            .then((res) => {
                // console.log(res.data.message);
                localStorage.setItem('token', res.data.token)
                return res
            })
            .then(() => {
                window.location.href = "/"
            })
            .catch((err) => {
                console.log(err.response.data.message)
                MySwal.fire({
                    icon: 'error',
                    title: "Error",
                    text: err.response.data.message || err.message
                })
            })
    }

    return (
        <div>
            <Navbar />
            <Container className='py-5'>

                <LoginForm onLogin={user => loginProcess(user)} />
                <div className='clearfix mt-3'>
                    <Link to={`/register`} className="float-end">Register</Link>
                </div>
                {/* <Button href={'/register'} variant="outline-primary" className='mt-3 w-100'>Register</Button> */}
            </Container>

        </div>
    )
}

export default Login