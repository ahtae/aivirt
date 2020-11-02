import React, { useState, useEffect } from 'react';
import { List } from '@material-ui/core';
import * as _ from 'lodash';
import MenuItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Trivia } from '../types';
import './TriviaCard.css';

type TriviaCardProps = {
  trivia: Trivia;
  handleChoiceClick: (choice: string | null) => void;
  selectedChoice: null | string;
};

const listItemStyle = { display: 'flex', justifyContent: 'center' };

const TriviaCard: React.FC<TriviaCardProps> = ({
  handleChoiceClick,
  trivia,
  selectedChoice,
}) => {
  const randomizeChoices = (choices: Array<string>) => {
    return _.shuffle(choices);
  };

  const [shuffledChoices, setShuffledChoices] = useState<string[]>(
    randomizeChoices(randomizeChoices(trivia.incorrect.concat(trivia.correct)))
  );

  useEffect(() => {
    setShuffledChoices(
      randomizeChoices(trivia.incorrect.concat(trivia.correct))
    );
  }, [trivia.question]);

  return (
    <div id="trivia">
      <h1 id="trivia-question">{trivia.question}</h1>
      <List>
        {shuffledChoices.map((choice) => (
          <MenuItem
            button
            key={choice}
            onClick={() => handleChoiceClick(choice)}
            selected={selectedChoice === choice}
          >
            <ListItemText className="choice" primary={choice} style={listItemStyle} />
          </MenuItem>
        ))}
      </List>
    </div>
  );
};

export default TriviaCard;
