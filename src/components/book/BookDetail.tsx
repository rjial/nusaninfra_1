import dayjs from 'dayjs';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Book } from '../../model/Book';
interface BookDetailProps {
    book: Book
}
export default (props: BookDetailProps) => {
    const {book} = props
    const parseDate = (date: string) => {
        return dayjs(date).format('dddd, DD MMMM YYYY')
    }
    return (
        <Card className="w-100">
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                <Row className='mt-3'>
                    <Col xl={2} md={5} sm={6}>Title</Col>
                    <Col xl={10} md={7} sm={6}>{book.title}</Col>
                </Row>
                <Row className='mt-2'>
                    <Col xl={2} md={5} sm={6}>ISBN</Col>
                    <Col xl={10} md={7} sm={6}>{book.isbn}</Col>
                </Row>
                <Row className='mt-2'>
                    <Col xl={2} md={5} sm={6}>Subtitle</Col>
                    <Col xl={10} md={7} sm={6}>{book.subtitle}</Col>
                </Row>
                <Row className='mt-2'>
                    <Col xl={2} md={5} sm={6}>Author</Col>
                    <Col xl={10} md={7} sm={6}>{book.author}</Col>
                </Row>
                <Row className='mt-2'>
                    <Col xl={2} md={5} sm={6}>Published</Col>
                    <Col xl={10} md={7} sm={6}>{parseDate(book.published as string)}</Col>
                </Row>
                <Row className='mt-2'>
                    <Col xl={2} md={5} sm={6}>Publisher</Col>
                    <Col xl={10} md={7} sm={6}>{book.publisher}</Col>
                </Row>
                <Row className='mt-2'>
                    <Col xl={2} md={5} sm={6}>Pages</Col>
                    <Col xl={10} md={7} sm={6}>{book.pages.toString()}</Col>
                </Row>
                <Row className='mt-2'>
                    <Col xl={2} md={5} sm={6}>Website</Col>
                    <Col xl={10} md={7} sm={6}>{book.website || "-"}</Col>
                </Row>
            </Card.Body>
        </Card>
    )
}