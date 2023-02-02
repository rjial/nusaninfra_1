import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Spinner } from "react-bootstrap"
import Navbar from "../../components/common/Navbar"
import { Book, BookResponse } from "../../model/Book"

export default () => {
    const [loading, setLoading] = useState(true)
    const [urlBooks, setUrlBooks] = useState("https://basic-book-crud-e3u54evafq-et.a.run.app/api/books")
    const [dataBooks, setDataBooks] = useState<Book[] | undefined>(undefined)

    useEffect(() => {
        axios.get(urlBooks, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                let data: BookResponse = new BookResponse(response.data)
                setDataBooks(data.data)
                console.log(data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [urlBooks])

    return (
        <div>
            <Navbar />
            <Container className='py-5 w-100'>
                <div className="d-flex justify-content-between align-items-center w-100">
                    <h1>Buku</h1>
                    <Button variant="success">Tambah Buku</Button>
                </div>
                <div className="mt-3">
                    {loading ? <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    </div> : dataBooks == undefined || dataBooks.length == 0 ? <>
                        <h3 className="text-center">Tidak ada buku yang ditemukan disini</h3>
                    </> : <></>}

                </div>
            </Container>

        </div>
    )
}