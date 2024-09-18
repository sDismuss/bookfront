export type BookResponse = {
    title: string;
    description: string;
    publisher: string;
    price: number;
    amount: number;
    _links: {
        self: {
            href: string;
        },
        book: {
            href: string;
        },
        author: {
            href: string;
        }
    };
}

export type Book = {
    title: string;
    description: string;
    publisher: string;
    price: number;
    amount: number;
}

export type BookEntry = {
    book: Book;
    url: string;
}