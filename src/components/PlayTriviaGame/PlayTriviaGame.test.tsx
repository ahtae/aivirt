import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import PlayTriviaGame from './PlayTriviaGame';

describe('PlayTriviaGame Component', () => {
  const score = 0;
  const increaseScore = jest.fn();
  const setHasClickedGetStartedButton = jest.fn();
  const resetScore = jest.fn();

  const component = render(
    <PlayTriviaGame
      score={score}
      increaseScore={increaseScore}
      setHasClickedGetStartedButton={setHasClickedGetStartedButton}
      resetScore={resetScore}
    />
  );
  const getStartedButton = component.container.querySelector(
    '#get-started-button'
  );
  const resetButton = component.container.querySelector('#reset-button');
  const endGameButton = component.container.querySelector('#end-game-button');
  const checkButton = component.container.querySelector('#check-button');
  const nextButton = component.container.querySelector('#next-button');
  const triviaDiv = component.container.querySelector('#trivia');

  test('renders content', () => {
    expect(getStartedButton).toBe(null);
    expect(triviaDiv).not.toBe(null);
    expect(resetButton).toHaveTextContent('reset');
    expect(checkButton).toHaveTextContent('check');
    expect(nextButton).toHaveTextContent('next');
    expect(endGameButton).toHaveTextContent('end game');
  });
});
