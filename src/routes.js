import { addBooksHandler, deleteBookHandler, editBookHandler, getAllBooksHandler, getBookByBookIdHandler } from "./handler.js";

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler,
  },
  {
     method: 'GET',
     path: '/books',
     handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByBookIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookHandler,
  },

];

export default routes;