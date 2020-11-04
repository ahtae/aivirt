import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import TriviaCard from './TriviaCard';

describe('TriviaCard Component', () => {
  const trivia = {
    question: "What was Tandem's previous name?",
    incorrect: ['Tandem', 'Burger Shack', 'Extraordinary Humans'],
    correct: 'Devmynd',
  };
  const handleChoiceClick = jest.fn();
  const selectedChoice = 'Tandem';

  const component = render(
    <TriviaCard
      trivia={trivia}
      handleChoiceClick={handleChoiceClick}
      selectedChoice={selectedChoice}
    />
  );

  const triviaQuestionContainer = component.container.querySelector(
    '#trivia-question'
  );
  const allChoices = component.container.querySelectorAll('.choice');
  const allChoicesValues: Array<string | null> = [];

  allChoices.forEach((choice) => allChoicesValues.push(choice.textContent));

  test('renders content', () => {
    const choices = trivia.incorrect.concat(trivia.correct);

    expect(triviaQuestionContainer).toHaveTextContent(
      "What was Tandem's previous name?"
    );
    expect(allChoices.length).toEqual(4);
    expect(allChoicesValues.sort()).toEqual(choices.sort());
  });
});
