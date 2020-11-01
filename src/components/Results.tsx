import React from 'react';
import { Button } from '@material-ui/core';

type ResultsProps = {
  score: number;
};

const Results: React.FC<ResultsProps> = ({ score }) => {
  return (
    <div>
      <h1>Good job! Your score was {score}.</h1>
      <Button
        id="get-started-button"
        variant="contained"
        color="secondary"
        onClick={() => {
          console.log('play again');
        }}
      >
        PLAY AGAIN
      </Button>
    </div>
  );
};

export default Results;
