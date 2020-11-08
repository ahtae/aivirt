import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { Button } from '@material-ui/core';
import { Trivia } from '../../types';
import './ReviewTriviaQuestions.css';
import { ReviewTriviaQuestion } from '../index';

type ReviewTriviaQuestionsProps = {
  listOfTrivia: Array<Trivia>;
  handleGoBackClick: () => void;
};

const useStyles = makeStyles((theme) => ({
  table: {
    display: 'block',
    width: '100%',
    overflowX: 'auto',
  },
  button: {
    margin: theme.spacing(2.0),
  },
}));

function createData(question: string, correct: string) {
  return { question, correct };
}

const ReviewTriviaQuestions: React.FC<ReviewTriviaQuestionsProps> = ({
  listOfTrivia,
  handleGoBackClick,
}) => {
  const classes = useStyles();
  const rows = listOfTrivia.map((trivia: Trivia) =>
    createData(trivia.question, trivia.correct)
  );
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (
    event: unknown,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      <TableContainer>
        <Table className={classes.table} aria-label="Review Trivia Table">
          <TableHead>
            <TableRow>
              <TableCell>Trivia Questions</TableCell>
              <TableCell align="right">Answers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <ReviewTriviaQuestion
                  key={row.question}
                  row={row}
                  emptyRows={emptyRows}
                />
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
        <Button
          id="go-back-button"
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={handleGoBackClick}
        >
          go back
        </Button>
      </TableContainer>
    </div>
  );
};

export default ReviewTriviaQuestions;
