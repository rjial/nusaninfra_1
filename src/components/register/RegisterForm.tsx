import React, { FormEvent, useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap';
import {UserRegister} from '../../model/User';

interface RegisterFormProps {
    onRegister: (user: UserRegister) => void
}

const RegisterForm = (Props: RegisterFormProps) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordconf, setPasswordConf] = useState("")
    const RegisterProcess = (e: FormEvent) => {
        Props.onRegister(new UserRegister(email, password, passwordconf, name))
        e.preventDefault();
    }
    return (
        <Form className="" onSubmit={e => RegisterProcess(e)}>
            <h1 className=''>Register</h1>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label >Name</Form.Label>
                <Form.Control type="text" name="name" className='' onChange={e => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label >Email</Form.Label>
                <Form.Control type="text" name="email" className='' onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label >Password</Form.Label>
                <Form.Control type="password" name="password" className='' onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordConf">
                <Form.Label >Password Confirmation</Form.Label>
                <Form.Control type="password" name="passwordConf" className='' onChange={e => setPasswordConf(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" className='w-100' onClick={e => RegisterProcess(e)}>
                Submit
            </Button>
        </Form>
    );
}

export default RegisterForm