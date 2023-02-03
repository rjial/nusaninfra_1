import { FormEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Book } from '../../model/Book';

interface TambahFormProps {
    className: string,
    onTambah(book: Book): void,
}

export default (props: TambahFormProps) => {
    const {className, onTambah} = props
    
    const [isbn, setISBN] = useState<String | undefined>(undefined)
    const [title, setTitle] = useState<String | undefined>(undefined)
    const [subtitle, setSubtitle] = useState<String | undefined>(undefined)
    const [author, setAuthor] = useState<String | undefined>(undefined)
    const [published, setPublished] = useState<String | undefined>(undefined)
    const [publisher, setPublisher] = useState<String | undefined>(undefined)
    const [pages, setPages] = useState<Number | undefined>(undefined)
    const [description, setDesc] = useState<String | undefined>(undefined)
    const [website, setWebsite] = useState<String | undefined>(undefined)
    const tambahProcess = (event: FormEvent) => {
        onTambah(new Book({isbn, title, subtitle, author, published, publisher, pages, description, website}))
        event.preventDefault()
    }
    return (
        <div className={className}>
            <Form onSubmit={e => tambahProcess(e)}>
                <Form.Group className="mb-3" controlId="isbn">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control type="number" placeholder="Enter ISBN" value={isbn != undefined ? isbn.toString() : ""} onChange={e => setISBN(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title" value={title != undefined ? title.toString() : ""} onChange={e => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="subtitle">
                    <Form.Label>Subtitle</Form.Label>
                    <Form.Control type="text" placeholder="Enter subtitle" value={subtitle != undefined ? subtitle.toString() : ""} onChange={e => setSubtitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="author">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="Enter author" value={author != undefined ? author.toString() : ""} onChange={e => setAuthor(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="published">
                    <Form.Label>Published</Form.Label>
                    <Form.Control type="date" placeholder="Enter published" value={published != undefined ? published.toString() : ""} onChange={e => setPublished(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="publisher">
                    <Form.Label>Publisher</Form.Label>
                    <Form.Control type="text" placeholder="Enter publisher" value={publisher != undefined ? publisher.toString() : ""} onChange={e => setPublisher(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="pages">
                    <Form.Label>Pages</Form.Label>
                    <Form.Control type="number" placeholder="Enter pages" value={pages != undefined ? pages.toString() : ""} onChange={e => setPages(parseInt(e.target.value))} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="website">
                    <Form.Label>Website</Form.Label>
                    <Form.Control type="text" placeholder="Enter Website" value={website != undefined ? website.toString() : ""} onChange={e => setWebsite(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={e => setDesc(e.target.value)} value={description != undefined ? description.toString() : ""} />
                </Form.Group>
                <Button variant="primary" type="submit" className='w-100'>
                    Submit
                </Button>
            </Form>
        </div>
    )
}