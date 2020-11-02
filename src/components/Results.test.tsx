import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Results from './Results';
import { fireEvent, render } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

configure({ adapter: new Adapter() });

describe('Results Component', () => {
  it('renders correct feedback when score is not good', () => {
    const score = 6;
    const totalNumberOfQuestions = 15;
    const handlePlayAgainClick = jest.fn();
    const handleGoBackHomeClick = jest.fn();

    const component = render(
      <Results
        score={score}
        totalNumberOfQuestions={totalNumberOfQuestions}
        handlePlayAgainClick={handlePlayAgainClick}
        handleGoBackHomeClick={handleGoBackHomeClick}
      />
    );

    expect(component.container).toHaveTextContent(
      `Good effort! Your score was 6/15`
    );
  });

  it('renders correct feedback when score is good', () => {
    const score = 8;
    const totalNumberOfQuestions = 15;
    const handlePlayAgainClick = jest.fn();
    const handleGoBackHomeClick = jest.fn();

    const component = render(
      <Results
        score={score}
        totalNumberOfQuestions={totalNumberOfQuestions}
        handlePlayAgainClick={handlePlayAgainClick}
        handleGoBackHomeClick={handleGoBackHomeClick}
      />
    );

    expect(component.container).toHaveTextContent(
      'Good job! Your score was 8/15'
    );
  });

  it('displays two buttons: play again and go back to home', () => {
    const score = 8;
    const totalNumberOfQuestions = 15;
    const handlePlayAgainClick = jest.fn();
    const handleGoBackHomeClick = jest.fn();

    const component = render(
      <Results
        score={score}
        totalNumberOfQuestions={totalNumberOfQuestions}
        handlePlayAgainClick={handlePlayAgainClick}
        handleGoBackHomeClick={handleGoBackHomeClick}
      />
    );

    const playAgainButton = component.container.querySelector(
      '#play-again-button'
    );
    const goBackHomeButton = component.container.querySelector(
      '#go-back-home-button'
    );

    expect(playAgainButton).toHaveTextContent('play again');
    expect(goBackHomeButton).toHaveTextContent('go back home');

    fireEvent.click(goBackHomeButton);
    expect(handleGoBackHomeClick.mock.calls).toHaveLength(1);
  });

  it('clicking the go back home button calls event handler once', () => {
    const score = 8;
    const totalNumberOfQuestions = 15;
    const handlePlayAgainClick = jest.fn();
    const handleGoBackHomeClick = jest.fn();

    const component = render(
      <Results
        score={score}
        totalNumberOfQuestions={totalNumberOfQuestions}
        handlePlayAgainClick={handlePlayAgainClick}
        handleGoBackHomeClick={handleGoBackHomeClick}
      />
    );

    const goBackHomeButton = component.container.querySelector(
      '#go-back-home-button'
    );

    fireEvent.click(goBackHomeButton);
    expect(handleGoBackHomeClick.mock.calls).toHaveLength(1);
  });

  it('clicking the go back home button calls event handler once', () => {
    const score = 8;
    const totalNumberOfQuestions = 15;
    const handlePlayAgainClick = jest.fn();
    const handleGoBackHomeClick = jest.fn();

    const component = render(
      <Results
        score={score}
        totalNumberOfQuestions={totalNumberOfQuestions}
        handlePlayAgainClick={handlePlayAgainClick}
        handleGoBackHomeClick={handleGoBackHomeClick}
      />
    );

    const playAgainButton = component.container.querySelector(
      '#play-again-button'
    );

    fireEvent.click(playAgainButton);
    expect(handlePlayAgainClick.mock.calls).toHaveLength(1);
  });
});
