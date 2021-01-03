import React, { useCallback, useEffect, useState } from 'react';
import BookListItem from '../components/BookListItem';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { IBook } from '../interfaces/book';
import { debounce } from '../utils';
import BooksAPI from '../services/api/book.service';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    input: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
      textAlign: 'center',
    },
  }),
);

interface IProps {
  search: string;
  setSearch: (value: React.SetStateAction<string>) => void;
}

const BookList: React.FC<IProps> = ({ search }) => {
  const classes = useStyles();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<IBook[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const queryBooks = useCallback(async (str: string, page: number, size: number) => {
    if (str) {
      try {
        setLoading(true);
        const { data } = await BooksAPI.getInstance().listGoogleBooks(str, { page, size });
        setTotalCount(data.totalElements);
        setBooks(data.content);
        setError('');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setBooks([]);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(queryBooks, 500), []);

  useEffect(() => {
    debouncedSearch(search, currentPage, rowsPerPage);
  }, [currentPage, debouncedSearch, rowsPerPage, search]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
    queryBooks(search, currentPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} cols={1}>
        {error ? (
          <GridListTile style={{ justifyContent: 'center', display: 'flex' }}>
            <Typography variant='caption'>Error: {error}</Typography>
          </GridListTile>
        ) : loading ? (
          <GridListTile style={{ justifyContent: 'center', display: 'flex' }}>
            <CircularProgress />
          </GridListTile>
        ) : books.length > 0 ? (
          books.map((book, idx) => (
            <GridListTile key={`${idx}-${book.title}`}>
              <BookListItem {...book}></BookListItem>
            </GridListTile>
          ))
        ) : (
          <GridListTile style={{ justifyContent: 'center', display: 'flex' }}>
            <Typography variant='caption'>{'No Data Available'}</Typography>
          </GridListTile>
        )}
        <GridListTile>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </GridListTile>
      </GridList>
    </div>
  );
};

export default BookList;
