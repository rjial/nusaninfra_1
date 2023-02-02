import { useState } from 'react'
import LoginForm from '../components/login/LoginForm'
import { User } from '../model/User'
import { loginFunc } from '../services/login'
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Navbar from '../components/common/Navbar';

const Login = () => {

    const MySwal = withReactContent(Swal)
    const loginProcess = (user: User) => {
        axios.defaults.baseURL = 'https://basic-book-crud-e3u54evafq-et.a.run.app/api';
        const formData: FormData = new FormData()
        formData.append("email", user.email as string)
        formData.append("password", user.password as string)
        axios.post('/login', { email: user.email, password: user.password })
            .then((res) => {
                // console.log(res.data.message);
                MySwal.fire({
                    icon: 'success',
                    title: "Success",
                    text: res.data.message
                })
            })
            .catch((err) => {
                // console.error(err.message)
                MySwal.fire({
                    icon: 'error',
                    title: "Error",
                    text: err.message
                })
            })
    }

    return (
        <div>
            <Navbar />
            <Container className='py-5'>
                
                <LoginForm onLogin={user => loginProcess(user)} />
                <div className='clearfix mt-3'>
                    <a href={'/register'} className="float-end">Register</a>
                </div>
                {/* <Button href={'/register'} variant="outline-primary" className='mt-3 w-100'>Register</Button> */}
            </Container>

        </div>
    )
}

export default Login