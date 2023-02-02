import React, { FormEvent, useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap';
import {User} from '../../model/User';

interface LoginFormProps {
    onLogin: (user: User) => void
}

const LoginForm = (Props: LoginFormProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const loginProcess = (e: FormEvent) => {
        Props.onLogin(new User(email, password))
        e.preventDefault();
    }
    return (
        <Form className="" onSubmit={e => loginProcess(e)}>
            <h1 className=''>Login</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label >Email</Form.Label>
                <Form.Control type="text" name="email" className='' onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label >Password</Form.Label>
                <Form.Control type="password" name="password" className='' onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" className='w-100' onClick={e => loginProcess(e)}>
                Submit
            </Button>
        </Form>
    );
}

export default LoginForm