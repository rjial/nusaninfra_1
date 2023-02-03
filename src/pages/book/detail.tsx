import axios from "axios"
import { useEffect, useState } from "react"
import { Breadcrumb, Container, Spinner } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useParams } from "react-router-dom"
import BookDetail from "../../components/book/BookDetail"
import Navbar from "../../components/common/Navbar"
import { Book } from "../../model/Book"

export default () => {
    const { bookId } = useParams()
    const [loading, setLoading] = useState<Boolean>(true)
    const [dataBook, setDataBook] = useState<Book | undefined>(undefined)
    useEffect(() => {
        axios.get(`https://basic-book-crud-e3u54evafq-et.a.run.app/api/books/${bookId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                let book = new Book(response.data)
                setDataBook(book)
                console.log(book)
            })
            .finally(() => {
                setLoading(false)
            })
        console.log(bookId)
    }, [bookId])
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
                    <h1>Buku</h1>
                    <></>
                </div>
                <div className="mt-3 row row-cols-1 gy-3">
                    {loading ? <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div> : dataBook == undefined ? <>
                        <h3 className="text-center">Tidak ada buku yang ditemukan disini</h3>
                    </> : <BookDetail book={dataBook} />
                    }


                </div>
            </Container>
        </div>

    )
}