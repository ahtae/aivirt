import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { TriviaCard, Results } from '../index';
import { makeStyles } from '@material-ui/core/styles';
import './PlayTriviaGame.css';
import trivia from '../../data/trivia.json';
import testTrivia from '../../data/trivia.test.json';
import { Trivia } from '../../types';

let listOfTrivia: Array<Trivia>;

if (process.env.NODE_ENV === 'test') {
  listOfTrivia = testTrivia;
} else {
  listOfTrivia = trivia;
}

const alertStyle = {
  marginTop: '1vmin',
  marginLeft: '1vmin',
  marginRight: '1vmin',
  borderStyle: 'bold',
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2.0),
  },
}));

const generateRandomNumber = () => {
  return Math.floor(Math.random() * listOfTrivia.length);
};

type PlayTriviaGameProps = {
  score: number;
  increaseScore: () => void;
  setHasClickedGetStartedButton: (value: boolean) => void;
  resetScore: () => void;
};

const PlayTriviaGame: React.FC<PlayTriviaGameProps> = ({
  score,
  increaseScore,
  setHasClickedGetStartedButton,
  resetScore,
}) => {
  const [indexOfTrivia, setIndexOfTrivia] = useState(generateRandomNumber());
  const [alreadySeen, setAlreadySeen] = useState({
    [`${indexOfTrivia}`]: true,
  });
  const [selectedTrivia, setSelectedTrivia] = useState(
    listOfTrivia[indexOfTrivia]
  );
  const [answered, setAnswered] = useState(0);
  const [hasClickedChoice, setHasClickedChoice] = useState(false);
  const [hasCorrectAnswer, setHasCorrectAnswer] = useState<null | boolean>(
    null
  );
  const [selectedChoice, setSelectedChoice] = useState<null | string>(null);
  const [hasCheckedChoice, setHasCheckedChoice] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const classes = useStyles();

  const generateUniqueRandomNumber = () => {
    let randomNumber = generateRandomNumber();
    let hasIndexAlreadyBeenSeen = randomNumber in alreadySeen;

    while (hasIndexAlreadyBeenSeen) {
      randomNumber = generateRandomNumber();
      hasIndexAlreadyBeenSeen = randomNumber in alreadySeen;
    }

    return randomNumber;
  };

  const resetGameState = () => {
    resetScore();
    setIndexOfTrivia(generateRandomNumber());
    setAlreadySeen({
      [`${indexOfTrivia}`]: true,
    });
    setSelectedTrivia(listOfTrivia[indexOfTrivia]);
    setAnswered(0);
    setHasCorrectAnswer(null);
    setHasCheckedChoice(false);
    setSelectedChoice(null);
    setHasClickedChoice(false);
    setShowResults(false);
  };

  const handleResetClick = () => {
    if (window.confirm('Are you sure you would like to reset the game?')) {
      resetGameState();
    }
  };

  const handlePlayAgainClick = () => {
    resetGameState();
  };

  const handleGoBackHomeClick = () => {
    resetGameState();
    setHasClickedGetStartedButton(false);
  };

  const handleChoiceClick = (choice: string | null) => {
    if (!hasCheckedChoice) {
      setHasClickedChoice(true);
      setSelectedChoice(choice);
    }
  };

  const handleEndGameClick = () => {
    if (window.confirm('Are you sure you would like to end the game?')) {
      resetGameState();
      setHasClickedGetStartedButton(false);
    }
  };

  const handleCheckClick = () => {
    if (selectedTrivia.correct === selectedChoice) {
      increaseScore();
      setHasCorrectAnswer(true);
    } else {
      setHasCorrectAnswer(false);
    }

    setAnswered(answered + 1);
    setHasCheckedChoice(true);
  };

  const handleNextTriviaClick = () => {
    const randomNumber = generateUniqueRandomNumber();

    setIndexOfTrivia(randomNumber);
    setAlreadySeen({ ...alreadySeen, [`${randomNumber}`]: true });
    setSelectedTrivia(listOfTrivia[randomNumber]);
    setHasCorrectAnswer(null);
    setHasClickedChoice(false);
    setHasCheckedChoice(false);
    setSelectedChoice(null);
  };

  const contents = !selectedTrivia ? (
    <h1>Loading...</h1>
  ) : showResults ? (
    <Results
      score={score}
      totalNumberOfQuestions={listOfTrivia.length}
      handlePlayAgainClick={handlePlayAgainClick}
      handleGoBackHomeClick={handleGoBackHomeClick}
    />
  ) : (
    <div id="trivia-container">
      <TriviaCard
        trivia={selectedTrivia}
        selectedChoice={selectedChoice}
        handleChoiceClick={handleChoiceClick}
      >
        {hasCorrectAnswer !== null ? (
          hasCorrectAnswer ? (
            <Alert variant="outlined" severity="success" style={alertStyle}>
              Correct answer!
            </Alert>
          ) : (
            <Alert variant="outlined" severity="error" style={alertStyle}>
              {`Incorrect answer! The correct answer is '${selectedTrivia.correct}'.`}
            </Alert>
          )
        ) : null}
        <div id="buttons-container">
          <Button
            id="reset-button"
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={handleResetClick}
          >
            reset
          </Button>
          <Button
            id="end-game-button"
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={handleEndGameClick}
          >
            end game
          </Button>

          <Button
            id="check-button"
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={handleCheckClick}
            disabled={!hasClickedChoice || hasCheckedChoice}
          >
            check
          </Button>
          <Button
            id="next-button"
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={
              answered !== listOfTrivia.length
                ? handleNextTriviaClick
                : () => setShowResults(true)
            }
            disabled={!hasClickedChoice || !hasCheckedChoice}
          >
            next
          </Button>
        </div>
      </TriviaCard>
    </div>
  );

  return contents;
};

export default PlayTriviaGame;
