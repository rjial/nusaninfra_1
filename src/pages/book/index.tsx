import axios from "axios"
import Fuse from "fuse.js"
import { useEffect, useState } from "react"
import { Breadcrumb, Button, Container, Form, Pagination, Spinner } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useNavigate } from "react-router-dom"
import BookCard from "../../components/book/BookCard"
import Navbar from "../../components/common/Navbar"
import { Book, BookListResponse } from "../../model/Book"
import useDebounce from "../../utilities/hooks/useDebounce"


export default () => {
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState<Number>(1)
    const [countPage, setCountPage] = useState<Number>(0)
    const [bookRes, setBookRes] = useState<BookListResponse | undefined>(undefined)
    const [urlBooks, setUrlBooks] = useState("https://basic-book-crud-e3u54evafq-et.a.run.app/api/books")
    const [dataBooks, setDataBooks] = useState<Book[] | undefined>(undefined)
    const [search, setSearch] = useState<String>("")
    const debounceSearch = useDebounce<string>(search.toString(), 500)
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token') == null) return navigate('/login')
    }, [])
    const loadBook = (id: number = 1) => {
        setLoading(true)
        axios.get(`https://basic-book-crud-e3u54evafq-et.a.run.app/api/books?page=${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                let data: BookListResponse = new BookListResponse(response.data)
                setCountPage(Math.ceil(data.total/data.per_page))
                setPage(data.current_page)
                setDataBooks(data.data)
                console.log(data)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        if (search.toString().length > 0) {
            axios.get(urlBooks, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                .then(response => {
                    let data: BookListResponse = new BookListResponse(response.data)
                    setBookRes(data)
                    const fuse = new Fuse(data.data, {
                        keys: ["title", "author"]
                    })
                    console.log(fuse.search(search.toString()))
                    setDataBooks(fuse.search(search.toString()).map(item => item.item))
                    // setDataBooks(data.data)
                    // console.log(data)
                })
        } else {
            loadBook()
        }
    }, [debounceSearch])
    useEffect(() => {
        loadBook()
    }, [urlBooks])
    const deleteBook = (id: Number) => {
        axios.delete(`https://basic-book-crud-e3u54evafq-et.a.run.app/api/books/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                loadBook()
                console.log(response)
            })
    }
    return (
        <div>
            <Navbar />
            <Container className='py-5 w-100'>
                <Breadcrumb>
                    <LinkContainer to={'/'}>
                        <Breadcrumb.Item active>Buku</Breadcrumb.Item>
                    </LinkContainer>
                </Breadcrumb>
                <div className="d-flex justify-content-between align-items-center w-100">
                    <h1>Buku</h1>
                    <LinkContainer to={'/buku/tambah'}>
                        <Button variant="success">Tambah Buku</Button>
                    </LinkContainer>
                </div>
                <Form>
                    <Form.Group className="my-3">
                        <Form.Control type="text" placeholder="Searching book....." value={search.toString()} onChange={e => setSearch(e.target.value)} />
                    </Form.Group>
                </Form>
                <div className="mt-3 row row-cols-1 gy-3">
                    {loading ? <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div> : dataBooks == undefined || dataBooks.length == 0 ? <>
                        <h3 className="text-center">Tidak ada buku yang ditemukan disini</h3>
                    </> :
                        dataBooks.map(book => (
                            <BookCard onDelete={id => deleteBook(id)} className="" book={book} />
                        ))
                    }

                </div>
                <div className="mt-3 d-flex align-items-center w-100 justify-content-center">
                    <Pagination>
                        {Array.apply(1, Array(countPage)).map((x, i) => (
                            <Pagination.Item onClick={() => loadBook(i+1)} active={i+1 === page}>{i+1}</Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </Container>
        </div>
    )
}