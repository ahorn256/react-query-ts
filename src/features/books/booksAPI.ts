import { Book, InputBook } from "./Book";

export async function fetchBooks():Promise<Book[]> {
  const url = process.env.REACT_APP_BACKEND_BOOKS_URL;

  if(!url) throw new Error('REACT_APP_BACKEND_BOOKS_URL undefined');
  
  const response = await fetch(url);

  if(response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(`Couldn't fetch books`);
  }
};

export async function deleteBook(id: string) {
  const url = process.env.REACT_APP_BACKEND_BOOKS_URL;

  if(!url) throw new Error('REACT_APP_BACKEND_BOOKS_URL undefined');

  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });

  if(response.ok) {
    return id;
  } else {
    throw new Error(`Couldn't delete the book with the id "${id}".`);
  }
}

export async function addBook(book: InputBook):Promise<Book> {
  const url = process.env.REACT_APP_BACKEND_BOOKS_URL;
  if(!url) throw new Error('REACT_APP_BACKEND_BOOKS_URL undefined');

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(book),
    headers: { 'content-type': 'application/json' },
  });
  
  if(response.ok) {
    const addedBook = await response.json();
    return addedBook;
  } else {
    throw new Error(`Couldn't add the book "${book.title}"`);
  }
}

export async function updateBook(book: Book):Promise<Book> {
  if(!('id' in book)) throw new Error(`Couldn't update a book. "id" is missing.`);

  const msgEditFailed = `Couldn't edit a book with the id="${book.id}"`;
  const url = process.env.REACT_APP_BACKEND_BOOKS_URL;

  if(!url) throw new Error('REACT_APP_BACKEND_BOOKS_URL is not defined');

  const response = await fetch(`${url}/${book.id}`, {
    method: 'PUT',
    body: JSON.stringify(book),
    headers: { 'content-type': 'application/json' },
  });

  if(response.ok) {
    return book;
  } else {
    throw new Error(msgEditFailed);
  }
}
