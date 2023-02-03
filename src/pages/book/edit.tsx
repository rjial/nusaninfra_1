import axios from "axios"
import { FormEvent, useEffect, useState } from "react"
import { Breadcrumb, Button, Container, Spinner } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import EditForm from "../../components/book/EditForm"
import TambahForm from "../../components/book/TambahForm"
import Navbar from "../../components/common/Navbar"
import { Book } from "../../model/Book"


export default () => {
    const { bookId } = useParams()
    const [dataBook, setDataBook] = useState<Book | undefined>(undefined)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const loadBook = () => {
        axios.get(`https://basic-book-crud-e3u54evafq-et.a.run.app/api/books/${bookId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                let bookData: Book = new Book(response.data)
                setDataBook(bookData)
            })
            .finally(() => {
                setLoading(false)
                // navigate("/")
            })
    }
    useEffect(() => {
        if (localStorage.getItem('token') == null) return navigate('/login')
        loadBook()
    }, [])
    const editProcess = (book: Book) => {
        console.log(book)
        axios.put(`https://basic-book-crud-e3u54evafq-et.a.run.app/api/books/${bookId}/edit`, book, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                console.log(response)
                return response
            })
            .then(() => {
                navigate("/")
            })
    }
    return (
        <div>
            <Navbar />
            <Container className='py-5 w-100'>
                <Breadcrumb>
                    <LinkContainer to={'/'}>
                        <Breadcrumb.Item >Buku</Breadcrumb.Item>
                    </LinkContainer>
                    <Breadcrumb.Item active>{dataBook?.title}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="d-flex justify-content-between align-items-center w-100">
                    <h1>Edit Buku</h1>
                    <></>
                </div>
                {loading ? <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div> : dataBook == undefined ?
                    <h3 className="text-center">Tidak ada buku yang ditemukan disini</h3>
                    : <EditForm className="mt-3" onEdit={book => editProcess(book)} book={dataBook} />}
                {/* <TambahForm className="mt-3" onTambah={book => editProcess(book)} /> */}
            </Container>

        </div>
    )
}