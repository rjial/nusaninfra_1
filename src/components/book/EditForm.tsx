import { FormEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Book } from '../../model/Book';

interface EditFormProps {
    className: string,
    onEdit(book: Book): void,
    book: Book
}

export default (props: EditFormProps) => {
    const {className, onEdit, book} = props
    
    const [isbn, setISBN] = useState<String>("")
    const [title, setTitle] = useState<String>("")
    const [subtitle, setSubtitle] = useState<String>("")
    const [author, setAuthor] = useState<String>("")
    const [published, setPublished] = useState<String>("")
    const [publisher, setPublisher] = useState<String>("")
    const [pages, setPages] = useState<Number>(0)
    const [description, setDesc] = useState<String>("")
    const [website, setWebsite] = useState<String>("")
    const editProcess = (event: FormEvent) => {
        onEdit(new Book({isbn, title, subtitle, author, published, publisher, pages, description, website}))
        event.preventDefault()
    }
    useEffect(() => {
        setISBN(book.isbn)
        setTitle(book.title)
        setSubtitle(book.subtitle)
        setAuthor(book.author)
        setPublished(book.getPublishedString())
        setPublisher(book.publisher)
        setPages(book.pages)
        setDesc(book.description)
        setWebsite(book.website)
    }, [])
    return (
        <div className={className}>
            <Form onSubmit={e => editProcess(e)}>
                <Form.Group className="mb-3" controlId="isbn">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control type="number" placeholder="Enter ISBN" value={isbn.toString()} onChange={e => setISBN(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title" value={title.toString()} onChange={e => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="subtitle">
                    <Form.Label>Subtitle</Form.Label>
                    <Form.Control type="text" placeholder="Enter subtitle" value={subtitle.toString()} onChange={e => setSubtitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="author">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="Enter author" value={author.toString()} onChange={e => setAuthor(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="published">
                    <Form.Label>Published</Form.Label>
                    <Form.Control type="date" placeholder="Enter published" value={published.toString()} onChange={e => setPublished(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="publisher">
                    <Form.Label>Publisher</Form.Label>
                    <Form.Control type="text" placeholder="Enter publisher" value={publisher.toString()} onChange={e => setPublisher(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="pages">
                    <Form.Label>Pages</Form.Label>
                    <Form.Control type="number" placeholder="Enter pages" value={pages.toString()} onChange={e => setPages(parseInt(e.target.value))} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="website">
                    <Form.Label>Website</Form.Label>
                    <Form.Control type="text" placeholder="Enter Website" value={website != null ? website.toString() : ""} onChange={e => setWebsite(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={e => setDesc(e.target.value)} value={description.toString()} />
                </Form.Group>
                <Button variant="primary" type="submit" className='w-100'>
                    Submit
                </Button>
            </Form>
        </div>
    )
}