import dayjs from "dayjs"

export class Book {
    id: Number | undefined
    user_id: Number | undefined
    isbn: String
    title: String
    subtitle: String
    author: String
    published: String
    publisher: String
    pages: Number
    description: String
    website: String
    created_at: String | undefined
    updated_at: String | undefined
    getPublishedString() {
        return dayjs(this.published as string).format("YYYY-MM-DD")
    }

    constructor(data: any) {
        this.id = data.id || undefined
        this.user_id = data.id || undefined
        this.isbn = data.isbn
        this.title = data.title
        this.subtitle = data.subtitle
        this.author = data.author
        this.published = data.published
        this.publisher = data.publisher
        this.pages = data.pages
        this.description = data.description
        this.website = data.website
        this.created_at = data.created_at || undefined
        this.updated_at = data.updated_at || undefined
    }
    
}

export class BookAddResponse {
    message: String
    data: Book

    constructor(data: any) {
        this.message = data.message
        this.data = new Book(data.data)
    }
}

export class BookListResponse {
    current_page: number
    data: Book[]
    first_page_url: String
    from: number
    last_page: number
    last_page_url: String
    next_page_url: String
    path: String
    per_page: number
    prev_page_url: String
    to: number
    total: number
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