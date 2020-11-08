import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

type ReviewTriviaQuestionProps = {
  row: {
    question: string;
    correct: string;
  };
  emptyRows: number;
};

const ReviewTriviaQuestion: React.FC<ReviewTriviaQuestionProps> = ({
  row,
  emptyRows,
}) => {
  return (
    <>
      <TableRow key={row.question}>
        <TableCell component="th" scope="row">
          {row.question}
        </TableCell>
        <TableCell align="right">{row.correct}</TableCell>
      </TableRow>
      {emptyRows > 0 && (
        <TableRow style={{ height: 55 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </>
  );
};

export default ReviewTriviaQuestion;
