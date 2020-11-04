import React from 'react';
import { Button } from '@material-ui/core';
import { Cat } from 'react-kawaii';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import { makeStyles } from '@material-ui/core/styles';
import './Results.css';

type ResultsProps = {
  score: number;
  totalNumberOfQuestions: number;
  handlePlayAgainClick: () => void;
  handleGoBackHomeClick: () => void;
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1.5),
  },
}));

const Results: React.FC<ResultsProps> = ({
  score,
  totalNumberOfQuestions,
  handlePlayAgainClick,
  handleGoBackHomeClick
}) => {
  const classes = useStyles();
  const { width, height } = useWindowSize();
  const hasGoodScore = Math.floor(totalNumberOfQuestions / 2) <= score;
  const resultImage = hasGoodScore ? (
    <Cat size={200} mood="excited" color="#596881" />
  ) : (
    <Cat size={200} mood="sad" color="#596881" />
  );
  const resultFeedback = hasGoodScore ? (
    <h1 id="feedback">
      Good job! Your score was {score}/{totalNumberOfQuestions}.
    </h1>
  ) : (
    <h1 id="feedback">
      Good effort! Your score was {score}/{totalNumberOfQuestions}.
    </h1>
  );
  const animation = hasGoodScore ? (
    <Confetti width={width} height={height} />
  ) : (
    <Confetti
      colors={['black']}
      width={width}
      height={height}
      drawShape={(ctx) => {
        ctx.beginPath();
        for (let i = 0; i < 22; i++) {
          const angle = 0.08 * i;
          const x = 0.5 * angle * Math.cos(angle);
          const y = 0.5 * angle * Math.sin(angle);
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.closePath();
      }}
    />
  );

  return (
    <div>
      {resultImage}
      {resultFeedback}
      {animation}
      <Button
        id="play-again-button"
        variant="contained"
        className={classes.button}
        color="secondary"
        onClick={handlePlayAgainClick}
      >
        play again
      </Button>
      <Button
        id="go-back-home-button"
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={handleGoBackHomeClick}
      >
        go back home
      </Button>
    </div>
  );
};

export default Results;
