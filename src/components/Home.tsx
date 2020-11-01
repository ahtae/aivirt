import React, { useState } from 'react';
import { Button, Card, Grid } from '@material-ui/core';
import PlayTriviaGame from './PlayTriviaGame';
import './Home.css';
import { Cat } from 'react-kawaii';

const cardStyle = {
  width: '65vw',
  transitionDuration: '0.3s',
  height: '40vw',
  border: '2px black solid',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

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
        Get Started
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
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: '100vh', textAlign: 'center' }}
    >
      <Grid item>
        <Card style={cardStyle}>{content}</Card>
      </Grid>
    </Grid>
  );
};
export default Home;
