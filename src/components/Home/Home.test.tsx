import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Home from './Home';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Home Component', () => {
  test('renders content when get started button is not clicked', () => {
    const component = render(<Home />);
    const getStartedButton = component.container.querySelector(
      '#get-started-button'
    );
    const buttonsContainer = component.container.querySelector(
      '#buttons-container'
    );
    const triviaDiv = component.container.querySelector('#trivia');

    expect(component.container).toHaveTextContent('aivirt');
    expect(getStartedButton).toHaveTextContent('get started');
    expect(buttonsContainer).toBe(null);
    expect(triviaDiv).toBe(null);
  });
});
