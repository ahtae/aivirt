import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import TriviaCard from './TriviaCard';
import { makeStyles } from '@material-ui/core/styles';
import Results from './Results';
import './PlayTriviaGame.css';

const listOfTrivia = [
  {
    question: 'What was Tandem previous name?',
    incorrect: ['Tandem', 'Burger Shack', 'Extraordinary Humans'],
    correct: 'Devmynd',
  },
  {
    question:
      "In Shakespeare's play Julius Caesar, Caesar's last words were...",
    incorrect: ['Iacta alea est!', 'Vidi, vini, vici', 'Aegri somnia vana'],
    correct: 'Et tu, Brute?',
  },
];

const alertStyle = {
  marginTop: '1vmin',
  marginLeft: '1vmin',
  marginRight: '1vmin',
  borderStyle: 'bold',
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1.5),
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

  const handleChoiceClick = (choice: string | null) => {
    if (!hasCheckedChoice) {
      setHasClickedChoice(true);
      setSelectedChoice(choice);
    }
  };

  const handleEndGameClick = () => {
    if (window.confirm('Are you sure you would like to end the game?')) {
      setHasClickedGetStartedButton(false);
      setIndexOfTrivia(generateRandomNumber());
      setAlreadySeen({
        [`${indexOfTrivia}`]: true,
      });
      setSelectedTrivia(listOfTrivia[indexOfTrivia]);
      setAnswered(0);
      setHasCorrectAnswer(false);
      setHasCheckedChoice(false);
      setSelectedChoice(null);
      setHasClickedChoice(false);
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
    <Results score={score} totalNumberOfQuestions={listOfTrivia.length} />
  ) : (
    <div id="trivia-container">
      <TriviaCard
        trivia={selectedTrivia}
        selectedChoice={selectedChoice}
        handleChoiceClick={handleChoiceClick}
      />
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
          id="get-started-button"
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => {
            console.log('yup');
          }}
        >
          reset
        </Button>
        <Button
          id="get-started-button"
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
          id="get-started-button"
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
    </div>
  );

  return contents;
};

export default PlayTriviaGame;
