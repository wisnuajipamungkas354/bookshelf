import { nanoid } from "nanoid";
import books from "./books.js";

const addBooksHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

  if(name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if(readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    })
    response.code(400);
    return response;
  }

  const bookId = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const book = {
    id: bookId,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  }
  books.push(book);

  const isSuccess = books.filter((book) => book.id === bookId).length > 0;

  if(isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId,
      },
    });
  
    response.code(201);
    return response;
  }
};

const getAllBooksHandler = (request, h) => {
  const { reading, finished, name } = request.query;
  let getBooks = books;

  if(name !== undefined) {
    getBooks = books.filter((book) => book['name'].toLowerCase().includes(name.toLowerCase()));
  }
  if(reading !== undefined) {
    if(Number(reading) === 1) {
      getBooks = books.filter((book) => book.reading === true);
    }
    if(Number(reading) === 0) {
      getBooks = books.filter((book) => book.reading === false);
    }
  }
  if(finished !== undefined) {
    if(Number(finished) === 1) {
      getBooks = books.filter((book) => book.finished === true);
    }
    if(Number(finished) === 0) {
      getBooks = books.filter((book) => book.finished === false);
    }
  }


  const response = h.response({
    status: 'success',
    data: {
     books: getBooks.map((book) => ({id: book.id, name: book.name, publisher: book.publisher})),
    },
  });
  response.code(200);

  return response;
};

const getBookByBookIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.find((b) => b.id === bookId);

  if(book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((b) => b.id === bookId);
  const { name, year, author, summary, publisher, pageCount, readPage, reading, } = request.payload;

  if(name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if(readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    })
    response.code(400);
    return response;
  }

  if(index !== -1) {
    books[index] = {
      ...books[index],
      name, 
      year, 
      author, 
      summary, 
      publisher, 
      pageCount, 
      readPage, 
      reading,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);
 
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

export { getAllBooksHandler, addBooksHandler, getBookByBookIdHandler, editBookHandler, deleteBookHandler };