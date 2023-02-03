import axios from "axios"
import { FormEvent, useEffect, useState } from "react"
import { Button, Container, Spinner } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useNavigate } from "react-router-dom"
import TambahForm from "../../components/book/TambahForm"
import Navbar from "../../components/common/Navbar"
import { Book } from "../../model/Book"
import bookValidationSchema from '../../utilities/validation/book'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default () => {
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)
    useEffect(() => {
        if (localStorage.getItem('token') == null) return navigate('/login')
    }, [])
    const tambahProcess = (book: Book) => {
        bookValidationSchema.isValid(book)
        .then(valid => {
            if (valid) {
                axios.post("https://basic-book-crud-e3u54evafq-et.a.run.app/api/books/add", book, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                .then(response => {
                    console.log(response)
                })
                .then(() => {
                    navigate("/")
                })
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: "Error",
                    text: "Empty fields"
                })
            }
        })

        
    }
    return (
        <div>
            <Navbar />
            <Container className='py-5 w-100'>
                <div className="d-flex justify-content-between align-items-center w-100">
                    <h1>Tambah Buku</h1>
                    <></>
                </div>
                <TambahForm className="mt-3" onTambah={book => tambahProcess(book)} />
            </Container>

        </div>
    )
}