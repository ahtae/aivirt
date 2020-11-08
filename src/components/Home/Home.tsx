import React, { useState } from 'react';
import { Button, Card, Grid } from '@material-ui/core';
import { PlayTriviaGame, ReviewTriviaQuestions } from '../index';
import './Home.css';
import { Cat } from 'react-kawaii';
import { Trivia } from '../../types';
import { makeStyles } from '@material-ui/core/styles';

const cardStyle = {
  transitionDuration: '0.3s',
  border: '2px black solid',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  overflow: 'hidden',
  justifyContent: 'center',
  width: 'auto',
  minWidth: '80vw',
  maxWidth: '80vw',
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: '100vmin',
    height: 'auto',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  button: {
    margin: theme.spacing(2.0),
  },
}));

type HomeProps = {
  listOfTrivia: Array<Trivia>;
};

const Home: React.FC<HomeProps> = ({ listOfTrivia }) => {
  const [hasClickedGetStartedButton, setHasClickedGetStartedButton] = useState(
    false
  );
  const [hasClickedReviewButton, setHasClickedReviewButton] = useState(false);
  const [score, setScore] = useState(0);

  const increaseScore = () => {
    setScore(score + 1);
  };

  const resetScore = () => {
    setScore(0);
  };

  const classes = useStyles();

  const handleGoBackClick = () => {
    setHasClickedReviewButton(false);
  };

  const content = hasClickedReviewButton ? (
    <ReviewTriviaQuestions
      handleGoBackClick={handleGoBackClick}
      listOfTrivia={listOfTrivia}
    />
  ) : !hasClickedGetStartedButton ? (
    <div>
      <Cat size={200} mood="excited" color="#596881" />
      <h1>aivirt</h1>
      <Button
        id="get-started-button"
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={() => {
          setHasClickedGetStartedButton(true);
        }}
      >
        get started
      </Button>
      <Button
        id="review-button"
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={() => {
          setHasClickedReviewButton(true);
        }}
      >
        review
      </Button>
    </div>
  ) : (
    <PlayTriviaGame
      score={score}
      resetScore={resetScore}
      increaseScore={increaseScore}
      setHasClickedGetStartedButton={setHasClickedGetStartedButton}
    />
  );

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={0}
        style={{
          textAlign: 'center',
          margin: 0,
          width: '100%',
          minHeight: '100vh',
        }}
      >
        <Grid item>
          <Card style={cardStyle}>{content}</Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
