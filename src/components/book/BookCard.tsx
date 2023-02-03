import axios from "axios";
import { Button, Card } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";
import { Book } from '../../model/Book';
import book from "../../pages/book";

interface BookCardProps {
    book: Book,
    onDelete(id: Number): void
}

export default (props: BookCardProps & React.HTMLAttributes<HTMLDivElement>) => {
    const { book, onDelete } = props
    const deleteBook = () => {
        onDelete(book.id!!)

    }
    return (
        <Card className="w-100">
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <div className="d-flex gx-2 mt-2 align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-1 h-1" style={{ width: '1rem', height: '1rem' }}>
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                    <span className="px-1">{book.author}</span>
                </div>
                <p className="mt-3">{book.description}</p>

                <div className="d-flex gx-2 flex-row-reverse">
                    <LinkContainer to={`/buku/${book.id}`}>
                        <Button className="" variant="primary">Detail</Button>
                    </LinkContainer>
                    <LinkContainer to={`/buku/edit/${book.id}`}>
                        <Button className="me-2" variant="secondary">Edit</Button>
                    </LinkContainer>
                    <Button onClick={() => deleteBook()} className="me-2" variant="danger">Hapus</Button>
                </div>
            </Card.Body>

        </Card>
    )
}