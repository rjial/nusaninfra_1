import { useEffect, useState } from 'react'
import LoginForm from '../components/login/LoginForm'
import { User, UserFull, UserRegister } from '../model/User'
import { loginFunc } from '../services/login'
import axios from 'axios';
import RegisterForm from '../components/register/RegisterForm';
import { Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Navbar from '../components/common/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import registerValidationSchema from '../utilities/validation/register'

const Register = () => {

    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token') != null) return navigate('/')
    }, [])
    const registerProcess = (user: UserRegister) => {
        console.log(user)
        registerValidationSchema.validate({ email: user.email, password: user.password, password_confirmation: user.passwordConf, name: user.name }, { abortEarly: false, strict: false, })
            .then(valid => {
                    axios.post('https://basic-book-crud-e3u54evafq-et.a.run.app/api/register', { email: user.email, password: user.password, password_confirmation: user.passwordConf, name: user.name })
                        .then((res) => {
                            // console.log(res.data.message);
                            MySwal.fire({
                                icon: 'success',
                                title: "Success",
                                text: res.data.message
                            })
                                .then(() => {
                                    navigate('/login')
                                })
                        })
                        .catch((err) => {
                            console.log(err)
                            console.error(err)
                            MySwal.fire({
                                icon: 'error',
                                title: "Error",
                                text: err.message
                            })
                        })

            })
            .catch(err => {
                MySwal.fire({
                    icon: 'error',
                    title: "Error",
                    html: <ul>
                        {err.errors.map((error: string) => (
                            <li>{error}</li>
                        ))}
                    </ul>
                })
            })
    }

    return (
        <div>
            <Navbar />
            <Container className='py-5'>
                <RegisterForm onRegister={user => registerProcess(user)} />
                <div className='clearfix mt-3'>
                    <Link to={`/login`} className="float-end">Login</Link>
                </div>
            </Container>
        </div>
    )
}

export default Register