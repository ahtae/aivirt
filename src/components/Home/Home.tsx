import React, { useState } from 'react';
import { Button, Card, Grid } from '@material-ui/core';
import { PlayTriviaGame } from '../index';
import './Home.css';
import { Cat } from 'react-kawaii';
import { makeStyles } from '@material-ui/core/styles';

const cardStyle = {
  transitionDuration: '0.3s',
  border: '2px black solid',
  display: 'flex',
  alignItems: 'center',
  height: 'auto',
  overflow: 'hidden',
  justifyContent: 'center',
  width: 'auto',
  minWidth: '80vw',
  maxWidth: '80vw'
};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: '100vmin',
    height: 'auto',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
}));

const Home: React.FC = () => {
  const [hasClickedGetStartedButton, setHasClickedGetStartedButton] = useState(
    false
  );
  const [score, setScore] = useState(0);

  const increaseScore = () => {
    setScore(score + 1);
  };

  const resetScore = () => {
    setScore(0);
  };

  const classes = useStyles();

  const content = !hasClickedGetStartedButton ? (
    <div>
      <Cat size={200} mood="excited" color="#596881" />
      <h1>aivirt</h1>
      <Button
        id="get-started-button"
        variant="contained"
        color="secondary"
        onClick={() => {
          setHasClickedGetStartedButton(true);
        }}
      >
        get started
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
        style={{ minHeight: '120vh', textAlign: 'center' }}
      >
        <Grid item>
          <Card style={cardStyle}>{content}</Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
