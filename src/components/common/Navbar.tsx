import axios from 'axios';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserProfile } from '../../model/User';
import axiosMid from '../../services/api';
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom';
import { isLogged } from '../../services/login';

export default () => {
    const [user, setUser] = useState<UserProfile | undefined>(undefined)
    const [statusUser, setStatusUser] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token') != "") {
            setStatusUser(true)
            // axios.get("", {headers: ""})
            axios.get("https://basic-book-crud-e3u54evafq-et.a.run.app/api/user", { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                .then(res => {
                    setUser(new UserProfile(res.data.email, res.data.name))
                })
                .catch(res => [
                    setStatusUser(false)
                ])
        } else {
            setStatusUser(false)
        }
    }, [])
    const logoutFunc = () => {
        axios.delete("https://basic-book-crud-e3u54evafq-et.a.run.app/api/user/logout", { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                const { data } = response
                localStorage.removeItem('token')
                window.location.href = "/login"
            })
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Buku</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {statusUser && user != undefined ? <>
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                        </> : <>

                        </>}

                    </Nav>

                    {statusUser && user != undefined ? <Nav>
                        <NavDropdown title={user?.name} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => logoutFunc()}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav> : <Nav>
                        <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/register">
                            <Nav.Link>Register</Nav.Link>
                        </LinkContainer>
                    </Nav>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}