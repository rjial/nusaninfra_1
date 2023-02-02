export class Book {
    id: Number
    user_id: Number
    isbn: String
    title: String
    subtitle: String
    author: String
    published: String
    publisher: String
    pages: Number
    description: Number
    website: String
    created_at: String
    updated_at: String

    constructor(data: any) {
        this.id = data.id
        this.user_id = data.id
        this.isbn = data.isbn
        this.title = data.title
        this.subtitle = data.subtitle
        this.author = data.author
        this.published = data.published
        this.publisher = data.publisher
        this.pages = data.pages
        this.description = data.description
        this.website = data.website
        this.created_at = data.created_at
        this.updated_at = data.updated_at
    }
}

export class BookResponse {
    current_page: Number
    data: Book[]
    first_page_url: String
    from: Number
    last_page: Number
    last_page_url: String
    next_page_url: String
    path: String
    per_page: Number
    prev_page_url: String
    to: Number
    total: Number
    constructor(data: any) {
        this.current_page = data.current_page
        this.data = (data.data as Array<Book>).map(item => new Book(item))
        this.first_page_url = data.first_page_url
        this.from = data.from
        this.last_page = data.last_page
        this.last_page_url = data.last_page_url
        this.next_page_url = data.next_page_url
        this.path = data.path
        this.per_page = data.per_page
        this.prev_page_url = data.prev_page_url
        this.to = data.to
        this.total = data.total
    }
}