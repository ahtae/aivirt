import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders content', () => {
    const component = render(<App />);
    const button = component.container.querySelector('#get-started-button');

    expect(component.container).toHaveTextContent('aivirt');
    expect(button).toHaveTextContent('get started');
  });
});
