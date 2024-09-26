import React, { useMemo, useState } from "react";
import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { Delete, Edit, Star, StarBorder } from "@mui/icons-material";
import { Book, BookSort, BookSortIn } from "./Book";
import { useNavigate } from "react-router-dom";
import { filterBooks, sortBooks } from "./booksHelpers";
import ErrorMessage from "../../ErrorMessage";

type Props = {
  filterByTitle?: string,
}

const tableHead = {
  title: 'Title',
  author: 'Author',
  isbn: 'ISBN',
  rating: 'Bewertung',
};

const List:React.FC<Props> = ({ filterByTitle }) => {
  const [ sort, setSort ] = useState<BookSort>({
    orderBy: 'title',
    order: 'asc',
  });
  const navigate = useNavigate();
  const [ books ] = useState<Book[]>([]);
  const filteredBooks = useMemo<Book[]>(() =>
    sortBooks(
      filterByTitle ?
        filterBooks(books, filterByTitle) :
        books, sort),
    [sort, books, filterByTitle]);
  
  function onDelete(book:Book) {
    navigate(`/delete/${book.id}`);
  }

  function onEdit(book:Book) {
    navigate(`/edit/${book.id}`);
  }

  return (
    <Paper>
      {<ErrorMessage error={{message: 'TODO: Error'}}/> }
      <Table>
        <TableHead>
          <TableRow>
            {Object.entries(tableHead).map(([key, head]) => (
              <TableCell key={key}>
                {head}
                <TableSortLabel
                  active={sort.orderBy === head}
                  direction={sort.order}
                  onClick={() => {
                    setSort({
                      orderBy: key as BookSortIn,
                      order: sort.order === 'asc' ? 'desc' : 'asc'
                    });
                  }} />
              </TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredBooks.map(book => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{Array(5).fill(0).map((item, index) => index < book.rating ? <Star key={index} /> : <StarBorder key={index} />)}</TableCell>
              <TableCell>
                <IconButton aria-label="edit book" onClick={() => onEdit(book)}>
                  <Edit />
                </IconButton>
                <IconButton aria-label="delete book" onClick={() => onDelete(book)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default List;
