import React from 'react';
import { Home } from '../index';
import { Trivia } from '../../types';
import trivia from '../../data/trivia.json';
import testTrivia from '../../data/trivia.test.json';
import './App.css';

let listOfTrivia: Array<Trivia>;

if (process.env.NODE_ENV === 'test') {
  listOfTrivia = testTrivia;
} else {
  listOfTrivia = trivia;
}

const App: React.FC = () => <Home listOfTrivia={listOfTrivia} />;

export default App;
