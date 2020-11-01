import React, { useState } from 'react';
import owlLogo from '../assets/images/owlLogo.png';
import { Button, Card, Grid } from '@material-ui/core';
import PlayTriviaGame from './PlayTriviaGame';
import './Home.css';

const cardStyle = {
  width: '65vw',
  transitionDuration: '0.3s',
  height: '35vw',
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
      <img className="App-logo" src={owlLogo} alt="Owl Logo" />
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
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ height: '100vh' }}
    >
      <Grid item>
        <Card style={cardStyle}>{content}</Card>
      </Grid>
    </Grid>
  );
};
export default Home;
